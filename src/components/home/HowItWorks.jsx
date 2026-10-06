"use client";

import {
  ArrowRight,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  CONTENT,
} from "@/constants/content";

export default function HowItWorks() {
  const {
    heading,
    description,
    steps,
  } = CONTENT.howItWorks;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="fp-container">
        {/* Section heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.55,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500 sm:text-sm">
            FairPick
          </p>

          <h2 className="mt-3 text-[clamp(2rem,7vw,3.5rem)] font-black leading-tight tracking-[-0.04em] text-slate-950">
            {heading}
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            {description}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map(
            (
              step,
              index
            ) => (
              <motion.article
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    index * 0.08,
                }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-950/5 sm:p-6 lg:p-7"
              >
                {/* Step number */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">
                    {step.number}
                  </div>

                  {index <
                    steps.length -
                      1 && (
                    <ArrowRight
                      size={18}
                      className="mt-3 hidden text-slate-300 lg:block"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <h3 className="mt-7 text-lg font-black tracking-tight text-slate-950 sm:text-xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div
                  aria-hidden="true"
                  className="mt-7 h-1 w-10 rounded-full bg-emerald-400 transition-all duration-300 group-hover:w-16"
                />
              </motion.article>
            )
          )}
        </div>
      </div>
    </section>
  );
}