import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type TourStep = {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

interface TourContextType {
  isActive: boolean;
  currentStepIndex: number;
  steps: TourStep[];
  startTour: (steps: TourStep[], tourId: string) => void;
  autoStartTour: (steps: TourStep[], tourId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [tourId, setTourId] = useState<string>('');

  const startTour = useCallback((newSteps: TourStep[], id: string) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setTourId(id);
    setIsActive(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const autoStartTour = useCallback((newSteps: TourStep[], id: string) => {
    const hasSeen = localStorage.getItem(`has_seen_tour_${id}`);
    if (!hasSeen) {
      startTour(newSteps, id);
    }
  }, [startTour]);

  const endTour = useCallback(() => {
    setIsActive(false);
    if (tourId) {
      localStorage.setItem(`has_seen_tour_${tourId}`, 'true');
    }
    document.body.style.overflow = 'auto';
  }, [tourId]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      endTour();
    }
  }, [currentStepIndex, steps.length, endTour]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        endTour();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, endTour]);

  return (
    <TourContext.Provider value={{ isActive, currentStepIndex, steps, startTour, autoStartTour, nextStep, prevStep, endTour }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
