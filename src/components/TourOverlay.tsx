import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTour } from '../contexts/TourContext';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

export default function TourOverlay() {
  const { isActive, currentStepIndex, steps, nextStep, prevStep, endTour } = useTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isActive || steps.length === 0) return;

    const updateRect = () => {
      const currentStep = steps[currentStepIndex];
      if (!currentStep) return;

      // Use a data attribute instead of ID to avoid clashing with existing IDs
      const el = document.querySelector(`[data-tour="${currentStep.targetId}"]`);
      if (el) {
        // Scroll element into view with smooth behavior
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        
        // Short timeout to let the scroll happen before measuring
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          setTargetRect(rect);
        }, 300);
      } else {
        // If element not found, just skip to next or clear rect
        console.warn(`Tour target [data-tour="${currentStep.targetId}"] not found.`);
        setTargetRect(null);
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [isActive, currentStepIndex, steps]);

  if (!isActive || steps.length === 0) return null;

  const currentStep = steps[currentStepIndex];
  const isLast = currentStepIndex === steps.length - 1;

  // Calculate Popover Position
  let popoverTop = 0;
  let popoverLeft = 0;

  if (targetRect) {
    // Default to 'bottom' if not specified
    const pos = currentStep.position || 'bottom';
    
    // Add some padding
    const PADDING = 16;
    const POPOVER_WIDTH = 320;

    // Center horizontally by default
    popoverLeft = targetRect.left + (targetRect.width / 2) - (POPOVER_WIDTH / 2);
    
    // Keep within window bounds
    if (popoverLeft < PADDING) popoverLeft = PADDING;
    if (popoverLeft + POPOVER_WIDTH > window.innerWidth - PADDING) {
      popoverLeft = window.innerWidth - POPOVER_WIDTH - PADDING;
    }

    if (pos === 'bottom') {
      popoverTop = targetRect.bottom + PADDING;
    } else if (pos === 'top') {
      popoverTop = targetRect.top - PADDING - 200; // rough height estimate
    } else if (pos === 'right') {
      popoverLeft = targetRect.right + PADDING;
      popoverTop = targetRect.top;
    } else if (pos === 'left') {
      popoverLeft = targetRect.left - POPOVER_WIDTH - PADDING;
      popoverTop = targetRect.top;
    }
  } else {
    // If no target, center on screen
    popoverTop = window.innerHeight / 2 - 100;
    popoverLeft = window.innerWidth / 2 - 160;
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <AnimatePresence>
        {/* Dark Overlay with cutout */}
        {targetRect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-auto"
            style={{
              background: 'radial-gradient(circle at center, transparent 0, rgba(15, 23, 42, 0.75) 0)',
              // Use mask to cut out a hole
              maskImage: `radial-gradient(circle at ${targetRect.left + targetRect.width / 2}px ${targetRect.top + targetRect.height / 2}px, transparent ${Math.max(targetRect.width, targetRect.height) / 2 + 10}px, black ${Math.max(targetRect.width, targetRect.height) / 2 + 20}px)`,
              WebkitMaskImage: `radial-gradient(circle at ${targetRect.left + targetRect.width / 2}px ${targetRect.top + targetRect.height / 2}px, transparent ${Math.max(targetRect.width, targetRect.height) / 2 + 10}px, black ${Math.max(targetRect.width, targetRect.height) / 2 + 20}px)`
            }}
          />
        )}
        {!targetRect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/75 pointer-events-auto"
          />
        )}

        {/* The Popover Box */}
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute pointer-events-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-[320px] p-6 border border-slate-100"
          style={{ top: popoverTop, left: popoverLeft }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-900 text-lg">{currentStep.title}</h3>
            <button 
              onClick={endTour}
              className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {currentStep.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all ${i === currentStepIndex ? 'w-4 bg-indigo-600' : 'w-1.5 bg-slate-200'}`} 
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              {currentStepIndex > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevStep}
                  className="rounded-full px-3 h-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              <Button 
                onClick={nextStep}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 h-8"
              >
                {isLast ? 'Finish' : (
                  <>Next <ChevronRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
