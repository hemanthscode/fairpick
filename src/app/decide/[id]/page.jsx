"use client";

import {
  Loader2,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import DecisionAnimation from "@/components/result/DecisionAnimation";

import {
  CONTENT,
} from "@/constants/content";

import 
  useDecision
 from "@/hooks/useDecision";

export default function DecidePage() {
  const params = useParams();
  const router = useRouter();

  const {
    decision,
    isHydrated,
    beginDecision,
    resetDecision,
  } = useDecision();

  const hasStartedRef =
    useRef(false);

  const handleAgain =
    useCallback(() => {
      resetDecision();

      router.push("/create");
    }, [
      resetDecision,
      router,
    ]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (
      !decision ||
      decision.id !== params.id ||
      !decision.choices?.length
    ) {
      router.replace("/create");

      return;
    }

    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    beginDecision();
  }, [
    beginDecision,
    decision,
    isHydrated,
    params.id,
    router,
  ]);

  if (
    !isHydrated ||
    !decision ||
    decision.id !== params.id
  ) {
    return (
      <main className="fixed inset-0 flex min-h-[100svh] items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">

        <div className="flex flex-col items-center justify-center text-center">

          <Loader2
            size={28}
            className="animate-spin text-emerald-400"
            aria-hidden="true"
          />

          <p className="mt-4 text-sm font-medium text-slate-500">
            {CONTENT.brand.name}
          </p>

        </div>

      </main>
    );
  }

  return (
    <main className="fixed inset-0 min-h-[100svh] overflow-hidden bg-slate-950">

      <DecisionAnimation
        choices={decision.choices}
        winner={decision.winner}
        onAgain={handleAgain}
      />

    </main>
  );
}