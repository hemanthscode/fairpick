"use client";

import {
  Plus,
  Sparkles,
  X,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

import {
  MAX_CHOICES,
  MIN_CHOICES,
} from "@/lib/decisionEngine";

import {
  CONTENT,
} from "@/constants/content";

import {
  MESSAGES,
} from "@/constants/messages";

function getInitialChoices() {
  return [
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "",
    },
  ];
}

export default function DecisionForm({
  onSubmit,
}) {
  const [choices, setChoices] =
    useState(
      getInitialChoices
    );

  const [error, setError] =
    useState("");

  const nextId =
    useRef(3);

  const inputRefs =
    useRef({});

  const filledCount =
    choices.filter(
      (choice) =>
        choice.value.trim()
    ).length;

  const updateChoice = (
    id,
    value
  ) => {
    setChoices((current) =>
      current.map((choice) =>
        choice.id === id
          ? {
              ...choice,
              value,
            }
          : choice
      )
    );

    if (error) {
      setError("");
    }
  };

  const addChoice = () => {
    if (
      choices.length >=
      MAX_CHOICES
    ) {
      return;
    }

    const id =
      nextId.current;

    nextId.current += 1;

    setChoices((current) => [
      ...current,
      {
        id,
        value: "",
      },
    ]);

    requestAnimationFrame(() => {
      inputRefs.current[
        id
      ]?.focus();
    });
  };

  const removeChoice = (
    id
  ) => {
    if (
      choices.length <=
      MIN_CHOICES
    ) {
      return;
    }

    setChoices((current) =>
      current.filter(
        (choice) =>
          choice.id !== id
      )
    );

    delete inputRefs.current[
      id
    ];

    setError("");
  };

  const focusNext = (
    index
  ) => {
    const nextChoice =
      choices[index + 1];

    if (nextChoice) {
      inputRefs.current[
        nextChoice.id
      ]?.focus();

      return;
    }

    addChoice();
  };

  const handleKeyDown = (
    event,
    index
  ) => {
    if (
      event.key !==
      "Enter"
    ) {
      return;
    }

    event.preventDefault();

    if (
      !choices[index].value.trim()
    ) {
      return;
    }

    focusNext(index);
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const cleanedChoices =
      choices
        .map((choice) =>
          choice.value.trim()
        )
        .filter(Boolean);

    if (
      cleanedChoices.length <
      MIN_CHOICES
    ) {
      setError(
        MESSAGES.validation.minimum
      );

      return;
    }

    if (
      cleanedChoices.length >
      MAX_CHOICES
    ) {
      setError(
        MESSAGES.validation.maximum
      );

      return;
    }

    setError("");

    onSubmit({
      choices:
        cleanedChoices,
    });
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-4 sm:space-y-5"
    >
      <Card
        padding="lg"
        className="overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 sm:gap-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Sparkles
                size={19}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">

              <h1 className="text-base font-bold text-slate-950 sm:text-lg">
                {
                  CONTENT.decision
                    .heading
                }
              </h1>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                {
                  CONTENT.decision
                    .description
                }
              </p>

            </div>

          </div>

          <div className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 sm:px-3">
            {filledCount}
          </div>

        </div>

        <div className="mt-6 space-y-3 sm:mt-7">

          {choices.map(
            (
              choice,
              index
            ) => (
              <div
                key={
                  choice.id
                }
                className="flex min-w-0 items-center gap-2 sm:gap-3"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 sm:h-10 sm:w-10">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">

                  <Input
                    ref={(
                      element
                    ) => {
                      inputRefs.current[
                        choice.id
                      ] = element;
                    }}
                    id={`choice-${choice.id}`}
                    placeholder={
                      CONTENT
                        .decision
                        .inputPlaceholder
                    }
                    value={
                      choice.value
                    }
                    onChange={(
                      event
                    ) =>
                      updateChoice(
                        choice.id,
                        event.target
                          .value
                      )
                    }
                    onKeyDown={(
                      event
                    ) =>
                      handleKeyDown(
                        event,
                        index
                      )
                    }
                    autoComplete="off"
                    enterKeyHint="next"
                  />

                </div>

                {choices.length >
                  MIN_CHOICES && (
                  <button
                    type="button"
                    onClick={() =>
                      removeChoice(
                        choice.id
                      )
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 sm:h-10 sm:w-10"
                    aria-label={`${CONTENT.decision.removeOptionLabel} ${index + 1}`}
                  >
                    <X
                      size={17}
                      aria-hidden="true"
                    />
                  </button>
                )}

              </div>
            )
          )}

        </div>

        <button
          type="button"
          onClick={
            addChoice
          }
          disabled={
            choices.length >=
            MAX_CHOICES
          }
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 text-sm font-bold text-slate-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 sm:mt-5"
        >
          <Plus
            size={17}
            aria-hidden="true"
          />

          {
            CONTENT.decision
              .addChoice
          }
        </button>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-semibold leading-5 text-red-600"
          >
            {error}
          </p>
        )}

      </Card>

      <Button
        type="submit"
        size="xl"
        fullWidth
        rightIcon={
          <Sparkles
            size={19}
            aria-hidden="true"
          />
        }
      >
        {
          CONTENT.decision
            .submit
        }
      </Button>

      <p className="px-2 text-center text-xs leading-5 text-slate-400">
        {
          CONTENT.decision
            .helper
        }
      </p>

    </form>
  );
}