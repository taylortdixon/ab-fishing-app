import { useState } from "react";

export const useWelcomeModalSteps = (stepCount: number) => {
  const [currentStep, setCurrentStep] = useState(0);

  const hasNextStep = currentStep + 1 < stepCount;
  const hasPreviousStep = currentStep >= 1;

  const goToNextStep = () => {
    if (!hasNextStep) {
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (!hasPreviousStep) {
      return;
    }

    setCurrentStep(currentStep - 1);
  };

  return {
    currentStep,
    hasNextStep,
    hasPreviousStep,
    goToNextStep,
    goToPreviousStep,
  } as const;
};
