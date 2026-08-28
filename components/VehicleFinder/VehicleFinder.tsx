"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Compass } from "lucide-react";
import ProgressIndicator from "./ProgressIndicator";
import Step1Budget from "./Step1Budget";
import Step2People from "./Step2People";
import Step3Journey from "./Step3Journey";
import Step4Result from "./Step4Result";
import { BUDGET_MAX, BUDGET_MIN, BUDGET_STEP } from "@/data/finder";
import type { JourneyType } from "@/data/finder";
import { cn } from "@/lib/cn";

const EASE = [0.4, 0, 0.2, 1] as const;
const STEP_LABELS = ["Budget", "Orang", "Tujuan", "Rekomendasi"];

type WizardStep = 1 | 2 | 3 | 4;

export default function VehicleFinder() {
  const [step, setStep] = useState<WizardStep>(1);
  const [budget, setBudget] = useState<number>(800000);
  const [people, setPeople] = useState<number>(5);
  const [journey, setJourney] = useState<JourneyType | null>(null);

  const handleReset = () => {
    setStep(1);
    setBudget(BUDGET_MIN);
    setPeople(5);
    setJourney(null);
  };

  return (
    <section className="mx-auto w-full max-w-[800px] px-5 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32">
      <header className="mb-10 text-center">
        <span className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          <Compass size={13} aria-hidden="true" />
          Vehicle Finder
        </span>
        <h1 className="mb-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-heading md:text-[40px]">
          Temukan mobil cocok untukmu.
        </h1>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-body-text md:text-base">
          Jawab 3 pertanyaan singkat, kami rekomendasikan armada yang pas untuk perjalananmu.
        </p>
      </header>

      <div className="rounded-[24px] border border-line bg-white p-6 shadow-card md:p-8">
        <ProgressIndicator current={step} total={4} labels={STEP_LABELS} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {step === 1 && (
              <Step1Budget
                budget={budget}
                onBudgetChange={setBudget}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2People
                people={people}
                onPeopleChange={setPeople}
                onPrev={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && journey !== null && (
              <Step3Journey
                journey={journey}
                onJourneyChange={(j) => setJourney(j)}
                onPrev={() => setStep(2)}
                onNext={() => setStep(4)}
              />
            )}
            {step === 3 && journey === null && (
              <Step3Journey
                journey={null}
                onJourneyChange={(j) => setJourney(j)}
                onPrev={() => setStep(2)}
                onNext={() => setStep(4)}
              />
            )}
            {step === 4 && journey && (
              <Step4Result
                budget={budget}
                people={people}
                journey={journey}
                onReset={handleReset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
