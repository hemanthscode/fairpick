"use client";

import {
  forwardRef,
} from "react";

import {
  motion,
} from "framer-motion";

const VARIANTS = {
  primary:
    "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 active:bg-emerald-700",

  secondary:
    "bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 active:bg-slate-950",

  outline:
    "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700",

  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",

  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

const SIZES = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm",
  xl: "min-h-12 px-5 text-sm sm:min-h-14 sm:px-6 sm:text-base",
};

const Button = forwardRef(
  function Button(
    {
      children,
      variant = "primary",
      size = "md",
      type = "button",
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      onClick,
      ...props
    },
    ref
  ) {
    const isDisabled =
      disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        whileHover={
          isDisabled
            ? undefined
            : {
                y: -1,
              }
        }
        whileTap={
          isDisabled
            ? undefined
            : {
                scale: 0.985,
              }
        }
        transition={{
          duration: 0.15,
        }}
        className={[
          "inline-flex min-w-0 items-center justify-center gap-2 rounded-xl font-bold transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          VARIANTS[variant],
          SIZES[size],
          fullWidth
            ? "w-full"
            : "w-auto max-w-full",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <span
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          leftIcon
        )}

        <span className="min-w-0 truncate">
          {loading
            ? "Please wait..."
            : children}
        </span>

        {!loading &&
          rightIcon}
      </motion.button>
    );
  }
);

export default Button;