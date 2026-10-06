"use client";

import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import Link from "next/link";

import {
  CONTENT,
} from "@/constants/content";

export default function Hero() {
  const {
    hero,
    trustPoints,
    preview,
  } = CONTENT.home;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl sm:h-[28rem] sm:w-[28rem] lg:left-[65%] lg:top-[10%] lg:h-[36rem] lg:w-[36rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[14rem] w-[14rem] rounded-full bg-slate-200/50 blur-3xl sm:h-[20rem] sm:w-[20rem]"
      />

      {/* Main content */}
      <div className="fp-container relative z-10 flex min-h-[100svh] items-center">
        <div className="grid w-full grid-cols-1 items-center gap-12 py-20 sm:gap-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)] lg:gap-20 lg:py-24 xl:grid-cols-[1.05fr_0.95fr] xl:gap-24">
          
          {/* Hero copy */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm sm:px-4 sm:text-xs">
              <Sparkles
                size={14}
                className="text-emerald-500"
                aria-hidden="true"
              />

              {hero.badge}
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-[clamp(2.75rem,11vw,5.5rem)] font-black leading-[0.95] tracking-[-0.055em] text-slate-950 sm:mt-8 lg:text-[clamp(3.5rem,6vw,5.75rem)]">
              {hero.heading}

              <span className="mt-1 block text-emerald-500">
                {hero.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-xl text-sm leading-6 text-slate-500 sm:mt-8 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg lg:leading-8">
              {hero.description}
            </p>

            {/* Actions */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/create"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition-all hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0 sm:w-auto"
              >
                {hero.primaryAction}

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
              >
                {hero.secondaryAction}
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
              {trustPoints.map(
                (point) => (
                  <div
                    key={point}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400"
                  >
                    <Check
                      size={14}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />

                    {point}
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Product preview */}
          <motion.div
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto"
          >
            <div className="relative">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-8 rounded-[2rem] bg-emerald-400/20 blur-3xl"
              />

              {/* Preview */}
              <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)] sm:rounded-[2rem]">
                
                {/* Window header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300">
                    {preview.status}
                  </span>
                </div>

                {/* Preview body */}
                <div className="p-5 sm:p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-500">
                        {preview.title}
                      </p>

                      <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                        {preview.subtitle}
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                      <Sparkles
                        size={18}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="mt-7">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                      {preview.optionsLabel}
                    </p>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {preview.options.map(
                        (option, index) => (
                          <div
                            key={option}
                            className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-400 shadow-sm">
                              {index + 1}
                            </span>

                            <span className="min-w-0 truncate text-sm font-semibold text-slate-600">
                              {option}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Ready section */}
                  <div className="mt-6 rounded-xl bg-slate-950 p-4 sm:mt-7 sm:p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                      {preview.readyLabel}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      {preview.readyMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}