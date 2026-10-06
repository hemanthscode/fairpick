"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  makeDecision,
  validateChoices,
} from "@/lib/decisionEngine";

import { generateId } from "@/lib/utils";

import useLocalStorage from "@/hooks/useLocalStorage";

export const CURRENT_DECISION_KEY =
  "current-decision";

export const INITIAL_DECISION = {
  id: null,
  choices: [],
  winner: null,
  choiceCount: 0,
  status: "idle",
};

export default function useDecision() {
  const {
    value: savedDecision,
    setValue: saveDecision,
    removeValue,
    isHydrated,
  } = useLocalStorage(
    CURRENT_DECISION_KEY,
    INITIAL_DECISION
  );

  const [decision, setDecision] =
    useState(INITIAL_DECISION);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (savedDecision?.id) {
      setDecision(savedDecision);
    }
  }, [
    isHydrated,
    savedDecision,
  ]);

  const effectiveDecision =
    isHydrated &&
    savedDecision?.id
      ? savedDecision
      : decision;

  const startDecision =
    useCallback(
      ({ choices }) => {
        const validation =
          validateChoices(
            choices
          );

        if (!validation.valid) {
          throw new Error(
            validation.error
          );
        }

        const nextDecision = {
          id: generateId(),
          choices:
            validation.choices,
          winner: null,
          choiceCount:
            validation.choices.length,
          status: "ready",
        };

        saveDecision(
          nextDecision
        );

        setDecision(
          nextDecision
        );

        return nextDecision.id;
      },
      [saveDecision]
    );

  const beginDecision =
    useCallback(() => {
      const current =
        effectiveDecision;

      if (!current?.id) {
        throw new Error(
          "No active FairPick decision."
        );
      }

      if (
        current.status ===
          "deciding" &&
        current.winner
      ) {
        return current;
      }

      const result =
        makeDecision(
          current.choices
        );

      const decidingDecision = {
        ...current,
        winner:
          result.winner,
        choices:
          result.choices,
        choiceCount:
          result.choiceCount,
        status: "deciding",
      };

      saveDecision(
        decidingDecision
      );

      setDecision(
        decidingDecision
      );

      return decidingDecision;
    }, [
      effectiveDecision,
      saveDecision,
    ]);

  const completeDecision =
    useCallback(() => {
      const current =
        effectiveDecision;

      if (!current?.winner) {
        throw new Error(
          "No winner has been selected."
        );
      }

      const completedDecision = {
        ...current,
        status: "completed",
      };

      saveDecision(
        completedDecision
      );

      setDecision(
        completedDecision
      );

      return completedDecision;
    }, [
      effectiveDecision,
      saveDecision,
    ]);

  const resetDecision =
    useCallback(() => {
      removeValue();
      setDecision(
        INITIAL_DECISION
      );
    }, [removeValue]);

  return {
    decision:
      effectiveDecision,

    isHydrated,

    startDecision,
    beginDecision,
    completeDecision,
    resetDecision,
  };
}