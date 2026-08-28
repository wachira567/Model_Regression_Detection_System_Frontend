import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LayoutDashboard, FileTerminal, Activity, Database, LogOut, ShieldCheck, Menu, X } from "lucide-react";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import EvalRunsPage from "./pages/EvalRunsPage";
import EvalRunDetailPage from "./pages/EvalRunDetailPage";
import PromptsPage from "./pages/PromptsPage";
import DatasetsPage from "./pages/DatasetsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ExperimentsPage from "./pages/ExperimentsPage";
import ExperimentDetailPage from "./pages/ExperimentDetailPage";
import CostPilotPage from "./pages/CostPilotPage";
import FeatureFlagsPage from "./pages/FeatureFlagsPage";
import TraceExplorerPage from "./pages/TraceExplorerPage";
import SemanticCachePage from "./pages/SemanticCachePage";
import TourGuide from "./components/TourGuide";

// Public Pages
import PublicLayout from "./components/PublicLayout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AuthPage from "./pages/AuthPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutPage from "./pages/AboutPage";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Protected Route Wrapper
function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const { logout, isSuperadmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Eval Runs', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Cost Pilot', path: '/dashboard/cost-pilot', icon: Activity },
    { name: 'Feature Flags', path: '/dashboard/flags', icon: Activity },
    { name: 'Semantic Cache', path: '/dashboard/cache', icon: Activity },
    { name: 'Experiments', path: '/dashboard/experiments', icon: Activity },
    { name: 'Analytics', path: '/dashboard/analytics', icon: Activity },
    { name: 'Prompts', path: '/dashboard/prompts', icon: FileTerminal },
    { name: 'Datasets', path: '/dashboard/datasets', icon: Database },
  ];

  if (isSuperadmin) {
    navItems.push({ name: 'Admin', path: '/dashboard/admin', icon: ShieldCheck });
  }

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-sm">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">MRDS</span>
        </Link>
      </div>
      
      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === '/dashboard' 
            ? location.pathname === '/dashboard' 
            : location.pathname.startsWith(item.path);
            
          return (
            <Link 
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 fixed h-full z-10 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-20 px-4 h-16 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-xl text-slate-900">MRDS</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-slate-600">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-40 flex flex-col md:hidden shadow-2xl"
            >
              <div className="absolute top-4 right-4">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <TourGuide />
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Marketing Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/features" element={<PublicLayout><FeaturesPage /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
            <Route path="/how-it-works" element={<PublicLayout><HowItWorksPage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage />} />
            
            {/* Authenticated Dashboard Routes */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<EvalRunsPage />} />
                    <Route path="/cost-pilot" element={<CostPilotPage />} />
                    <Route path="/flags" element={<FeatureFlagsPage />} />
                    <Route path="/cache" element={<SemanticCachePage />} />
                    <Route path="/experiments" element={<ExperimentsPage />} />
                    <Route path="/experiments/:id" element={<ExperimentDetailPage />} />
                    <Route path="/traces/:id" element={<TraceExplorerPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/prompts" element={<PromptsPage />} />
                    <Route path="/datasets" element={<DatasetsPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/eval-runs/:runId" element={<EvalRunDetailPage />} />
                  </Routes>
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
