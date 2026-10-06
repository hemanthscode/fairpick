"use client";

import {
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import DecisionForm from "@/components/decision/DecisionForm";

import {
  CONTENT,
} from "@/constants/content";

import 
  useDecision
 from "@/hooks/useDecision";

export default function CreatePage() {
  const router =
    useRouter();

  const {
    startDecision,
  } = useDecision();

  const handleSubmit = ({
    choices,
  }) => {
    const id =
      startDecision({
        choices,
      });

    router.push(
      `/decide/${id}`
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">

      <div className="fp-container py-6 sm:py-8 lg:py-10">

        <div className="mx-auto max-w-2xl">

          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950 sm:mb-8"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />

            {CONTENT.brand.name}
          </Link>

          <div className="mb-7 sm:mb-9">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">
              {CONTENT.brand.name}
            </p>

            <h1 className="mt-2 text-[clamp(2rem,8vw,3.5rem)] font-black leading-[1] tracking-[-0.04em] text-slate-950">
              {CONTENT.decision.heading}
            </h1>

          </div>

          <DecisionForm
            onSubmit={
              handleSubmit
            }
          />

        </div>
      </div>
    </main>
  );
}