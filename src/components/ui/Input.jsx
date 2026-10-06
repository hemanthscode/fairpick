"use client";

import {
  forwardRef,
  useId,
} from "react";

const Input = forwardRef(
  function Input(
    {
      id,
      label,
      error,
      helperText,
      required = false,
      className = "",
      ...props
    },
    ref
  ) {
    const generatedId =
      useId();

    const inputId =
      id || generatedId;

    const errorId =
      `${inputId}-error`;

    const helperId =
      `${inputId}-helper`;

    const describedBy = error
      ? errorId
      : helperText
        ? helperId
        : undefined;

    return (
      <div className="w-full min-w-0">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            {label}

            {required && (
              <span
                className="ml-1 text-emerald-600"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(
            error
          )}
          aria-describedby={
            describedBy
          }
          className={[
            "min-h-11 w-full min-w-0 rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 sm:px-4 sm:py-3",
            "placeholder:text-slate-400",
            "transition-all duration-200",
            "focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-500/10"
              : "border-slate-200",
            className,
          ].join(" ")}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="mt-2 text-xs font-medium leading-5 text-red-600"
          >
            {error}
          </p>
        )}

        {!error &&
          helperText && (
            <p
              id={helperId}
              className="mt-2 text-xs leading-5 text-slate-400"
            >
              {helperText}
            </p>
          )}
      </div>
    );
  }
);

export default Input;