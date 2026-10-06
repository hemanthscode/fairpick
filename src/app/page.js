import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">
      <Hero />

      <HowItWorks />
    </main>
  );
}