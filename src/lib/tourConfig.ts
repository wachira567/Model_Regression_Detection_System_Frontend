import { TourStep } from '../contexts/TourContext';

export const USER_DASHBOARD_STEPS: TourStep[] = [
  {
    targetId: 'sidebar-nav',
    title: 'Navigation Hub',
    content: 'Welcome! This is your command center. Jump between your Datasets, Prompt configurations, and live Eval Runs here.',
    position: 'right'
  },
  {
    targetId: 'workspace-selector',
    title: 'Workspaces',
    content: 'Use this dropdown to switch between different projects or create a new one to keep your evaluations organized.',
    position: 'right'
  },
  {
    targetId: 'tour-trigger',
    title: 'Need Help?',
    content: 'You can restart this tour anytime by clicking this button. Happy evaluating!',
    position: 'top'
  }
];

export const ADMIN_DASHBOARD_STEPS: TourStep[] = [
  {
    targetId: 'admin-stats',
    title: 'Global Overview',
    content: 'These metrics show you the system-wide health, active users, and total LLM tokens processed across ALL organizations.',
    position: 'bottom'
  },
  {
    targetId: 'admin-orgs',
    title: 'Organization Management',
    content: 'Here you can monitor, suspend, or upgrade tenant accounts. You have full visibility into their usage.',
    position: 'bottom'
  },
  {
    targetId: 'admin-logs',
    title: 'System Logs',
    content: 'Real-time visibility into internal server events, auth failures, and background worker errors.',
    position: 'top'
  }
];
