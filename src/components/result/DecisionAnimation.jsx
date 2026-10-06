"use client";

import {
  Check,
  Copy,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import Button from "@/components/ui/Button";

import {
  CONTENT,
} from "@/constants/content";

const ANIMATION_DURATION =
  3200;

/* Fast at the start, then eases out hard so the last
   few picks slow down and build suspense. */
function getInterval(
  elapsed
) {
  const progress =
    Math.min(
      elapsed /
        ANIMATION_DURATION,
      1
    );

  return (
    55 +
    Math.pow(progress, 2.4) *
      420
  );
}

export default function DecisionAnimation({
  choices,
  winner,
  onAgain,
}) {
  const [displayedChoice, setDisplayedChoice] =
    useState(
      choices?.[0] || ""
    );

  const [isFinished, setIsFinished] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const startTimeRef =
    useRef(null);

  const timeoutRef =
    useRef(null);

  const winnerRef =
    useRef(winner);

  const lastIndexRef =
    useRef(0);

  const stepDurationRef =
    useRef(0.12);

  winnerRef.current =
    winner;

  useEffect(() => {
    if (!choices?.length) {
      return;
    }

    let cancelled = false;

    startTimeRef.current =
      performance.now();

    lastIndexRef.current = 0;

    setIsFinished(false);
    setDisplayedChoice(
      choices[0]
    );

    const finish = () => {
      if (cancelled) {
        return;
      }

      setIsFinished(true);
    };

    const begin = () => {
      if (cancelled) {
        return;
      }

      const elapsed =
        performance.now() -
        startTimeRef.current;

      const nextInterval =
        getInterval(elapsed);

      const finalWinner =
        winnerRef.current ||
        choices[
          choices.length - 1
        ];

      /* Last step: land on the winner itself, then finish.
         The user never sees a different option right before the result. */
      if (
        elapsed + nextInterval >=
        ANIMATION_DURATION
      ) {
        stepDurationRef.current = 0.32;

        setDisplayedChoice(
          finalWinner
        );

        timeoutRef.current =
          window.setTimeout(
            finish,
            380
          );

        return;
      }

      /* Random picks: never repeat the previous one,
         and never show the winner early. */
      let candidates = choices
        .map((_, i) => i)
        .filter(
          (i) =>
            i !==
              lastIndexRef.current &&
            choices[i] !==
              finalWinner
        );

      if (!candidates.length) {
        candidates = choices.map(
          (_, i) => i
        );
      }

      const index =
        candidates[
          Math.floor(
            Math.random() *
              candidates.length
          )
        ];

      lastIndexRef.current =
        index;

      stepDurationRef.current =
        Math.min(
          (nextInterval / 1000) *
            0.9,
          0.32
        );

      setDisplayedChoice(
        choices[index]
      );

      timeoutRef.current =
        window.setTimeout(
          begin,
          nextInterval
        );
    };

    timeoutRef.current =
      window.setTimeout(
        begin,
        70
      );

    return () => {
      cancelled = true;

      if (
        timeoutRef.current
      ) {
        window.clearTimeout(
          timeoutRef.current
        );
      }
    };
  }, [
    choices,
  ]);

  const handleCopy =
    async () => {
      if (!winner) {
        return;
      }

      try {
        await navigator.clipboard.writeText(
          winner
        );

        setCopied(true);

        window.setTimeout(
          () =>
            setCopied(false),
          1800
        );
      } catch {
        setCopied(false);
      }
    };

  const handleShare =
    async () => {
      if (!winner) {
        return;
      }

      const shareText =
        `${CONTENT.brand.name}: ${winner}`;

      if (
        navigator.share
      ) {
        try {
          await navigator.share({
            title:
              CONTENT.brand.name,
            text: shareText,
          });
        } catch {
          // User cancelled sharing.
        }

        return;
      }

      try {
        await navigator.clipboard.writeText(
          shareText
        );

        setCopied(true);

        window.setTimeout(
          () =>
            setCopied(false),
          1800
        );
      } catch {
        setCopied(false);
      }
    };

  return (
    <section className="relative flex min-h-full w-full items-center justify-center overflow-hidden px-5 py-10 text-white sm:px-8 lg:px-12">

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl sm:h-[32rem] sm:w-[32rem] lg:h-[42rem] lg:w-[42rem]"
      />

      {/* Decorative particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[18%] h-1.5 w-1.5 rounded-full bg-emerald-400/60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-[28%] h-1 w-1 rounded-full bg-white/30"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[22%] left-[20%] h-1 w-1 rounded-full bg-emerald-300/40"
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 sm:text-xs"
        >
          <Sparkles
            size={14}
            aria-hidden="true"
          />

          {isFinished
            ? CONTENT.result.badge
            : CONTENT.result.cyclingLabel}
        </motion.div>

        <div className="mt-10 flex min-h-[8rem] w-full items-center justify-center px-2 sm:mt-12 sm:min-h-[10rem] sm:px-6 lg:min-h-[12rem]">

          <motion.h1
            key={displayedChoice}
            initial={{
              opacity: 0,
              y: -36,
              scale: 0.94,
              filter: "blur(6px)",
            }}
            animate={
              isFinished
                ? {
                    opacity: 1,
                    y: 0,
                    scale: [1, 1.1, 1],
                    filter: "blur(0px)",
                    textShadow:
                      "0 0 40px rgba(52,211,153,0.55)",
                  }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    textShadow:
                      "0 0 0px rgba(52,211,153,0)",
                  }
            }
            transition={
              isFinished
                ? {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.5, 1],
                  }
                : {
                    duration:
                      stepDurationRef.current,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
            className="max-w-4xl break-words text-[clamp(2rem,8vw,3rem)] font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-[clamp(2.5rem,8vw,4rem)] lg:text-[clamp(3rem,7vw,4.5rem)]"
          >
            {displayedChoice}
          </motion.h1>

        </div>

        {isFinished && (
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.15,
            }}
            className="w-full"
          >

            <p className="mt-2 text-sm font-semibold text-emerald-300 sm:text-base">
              {CONTENT.result.winnerLabel}
            </p>

            <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              {CONTENT.result.message}
              <br />
              {CONTENT.result.subMessage}
            </p>

            <div className="mx-auto mt-8 grid w-full max-w-xl grid-cols-1 gap-3 min-[420px]:grid-cols-2">

              <Button
                type="button"
                onClick={
                  handleCopy
                }
                variant="secondary"
                fullWidth
                leftIcon={
                  copied ? (
                    <Check
                      size={17}
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy
                      size={17}
                      aria-hidden="true"
                    />
                  )
                }
              >
                {copied
                  ? CONTENT.result.copied
                  : CONTENT.result.copy}
              </Button>

              <Button
                type="button"
                onClick={
                  handleShare
                }
                variant="secondary"
                fullWidth
                leftIcon={
                  <Share2
                    size={17}
                    aria-hidden="true"
                  />
                }
              >
                {CONTENT.result.share}
              </Button>

            </div>

            <button
              type="button"
              onClick={
                onAgain
              }
              className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-white"
            >
              <RotateCcw
                size={15}
                aria-hidden="true"
              />

              {CONTENT.result.again}
            </button>

            <p className="mt-7 text-xs font-medium text-slate-600">
              {CONTENT.result.footer}
            </p>

          </motion.div>
        )}

      </div>
    </section>
  );
}