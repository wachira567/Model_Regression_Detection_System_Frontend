import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

export default function TourGuide() {
  const [run, setRun] = useState(false);

  const steps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      title: 'Welcome to MRDS! 👋',
      content: 'This is the Model Regression Detection System. Let us show you around!',
      disableBeacon: true,
    },
    {
      target: 'a[href="/prompts"]',
      title: 'Prompt Configurations',
      content: 'Here you can manage your system prompts and model configurations.',
      placement: 'right',
    },
    {
      target: 'a[href="/datasets"]',
      title: 'Golden Datasets',
      content: 'Manage your ground-truth datasets used to evaluate the models.',
      placement: 'right',
    },
    {
      target: 'a[href="/eval-runs"]',
      title: 'Evaluation Runs',
      content: 'Trigger, monitor, and view the results of your model evaluations.',
      placement: 'right',
    },
    {
      target: 'a[href="/analytics"]',
      title: 'Analytics Dashboard',
      content: 'Visualize model performance, drift, and regressions over time.',
      placement: 'right',
    }
  ];

  useEffect(() => {
    // Only run tour if they haven't completed it before
    const hasCompletedTour = localStorage.getItem('mrds_tour_completed');
    if (!hasCompletedTour) {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('mrds_tour_completed', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#4f46e5', // indigo-600
          textColor: '#334155', // slate-700
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(15, 23, 42, 0.6)', // slate-900 with opacity
          zIndex: 1000,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: '#4f46e5',
          borderRadius: '6px',
        },
        buttonBack: {
          color: '#64748b',
        },
        buttonSkip: {
          color: '#64748b',
        }
      }}
    />
  );
}
