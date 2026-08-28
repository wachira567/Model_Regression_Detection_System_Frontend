import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LayoutDashboard, FileTerminal, Activity, Database, LogOut, ShieldCheck } from "lucide-react";
import EvalRunsPage from "./pages/EvalRunsPage";
import EvalRunDetailPage from "./pages/EvalRunDetailPage";
import PromptsPage from "./pages/PromptsPage";
import DatasetsPage from "./pages/DatasetsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import TourGuide from "./components/TourGuide";

// Public Pages
import PublicLayout from "./components/PublicLayout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AuthPage from "./pages/AuthPage";

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-slate-900 shadow-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="bg-emerald-500 p-2 rounded-lg hover:bg-emerald-400 transition-colors">
              <LayoutDashboard className="h-6 w-6 text-slate-900" />
            </Link>
            <h1 className="text-xl font-bold text-white tracking-tight">MRDS</h1>
          </div>
          <nav className="flex space-x-6">
            <Link to="/dashboard" className={`font-medium flex items-center space-x-2 transition-colors ${location.pathname === '/dashboard' ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'}`}>
              <LayoutDashboard className="h-4 w-4" />
              <span>Eval Runs</span>
            </Link>
            <Link to="/dashboard/analytics" className={`font-medium flex items-center space-x-2 transition-colors ${location.pathname.startsWith('/dashboard/analytics') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'}`}>
              <Activity className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link to="/dashboard/prompts" className={`font-medium flex items-center space-x-2 transition-colors ${location.pathname.startsWith('/dashboard/prompts') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'}`}>
              <FileTerminal className="h-4 w-4" />
              <span>Prompts</span>
            </Link>
            <Link to="/dashboard/datasets" className={`font-medium flex items-center space-x-2 transition-colors ${location.pathname.startsWith('/dashboard/datasets') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'}`}>
              <Database className="h-4 w-4" />
              <span>Datasets</span>
            </Link>
            {isSuperadmin && (
              <Link to="/dashboard/admin" className={`font-medium flex items-center space-x-2 transition-colors ${location.pathname.startsWith('/dashboard/admin') ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'}`}>
                <ShieldCheck className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>
      
      {/* Product Tour */}
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
            
            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage />} />
            
            {/* Authenticated Dashboard Routes */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<EvalRunsPage />} />
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

