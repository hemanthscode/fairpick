"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getStorage,
  removeStorage,
  setStorage,
} from "@/lib/storage";

export default function useLocalStorage(
  key,
  initialValue
) {
  const [value, setValueState] =
    useState(initialValue);

  const [isHydrated, setIsHydrated] =
    useState(false);

  useEffect(() => {
    const storedValue =
      getStorage(
        key,
        initialValue
      );

    setValueState(storedValue);
    setIsHydrated(true);
  }, [key, initialValue]);

  const setValue = useCallback(
    (nextValue) => {
      setValueState(
        (currentValue) => {
          const resolvedValue =
            typeof nextValue ===
            "function"
              ? nextValue(
                  currentValue
                )
              : nextValue;

          setStorage(
            key,
            resolvedValue
          );

          return resolvedValue;
        }
      );
    },
    [key]
  );

  const removeValue =
    useCallback(() => {
      removeStorage(key);
      setValueState(initialValue);
    }, [
      key,
      initialValue,
    ]);

  const reset = useCallback(() => {
    setStorage(
      key,
      initialValue
    );

    setValueState(
      initialValue
    );
  }, [
    key,
    initialValue,
  ]);

  return {
    value,
    setValue,
    removeValue,
    reset,
    isHydrated,
  };
}