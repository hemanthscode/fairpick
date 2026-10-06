"use client";

import {
  motion,
} from "framer-motion";

const PADDING = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6 sm:p-7",
};

export default function Card({
  children,
  padding = "md",
  hover = false,
  className = "",
  ...props
}) {
  const Component =
    hover
      ? motion.div
      : "div";

  const motionProps = hover
    ? {
        whileHover: {
          y: -3,
        },
        transition: {
          duration: 0.2,
        },
      }
    : {};

  return (
    <Component
      className={[
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        PADDING[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}