import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { Button } from './ui/button';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isFeatures = location.pathname === '/features';
  const isPricing = location.pathname === '/pricing';

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Global Public Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 p-1.5 rounded-lg group-hover:bg-indigo-600 transition-colors">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MRDS</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/features" 
              className={`text-sm font-medium transition-colors hover:text-slate-900 ${isFeatures ? 'text-slate-900' : 'text-slate-500'}`}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className={`text-sm font-medium transition-colors hover:text-slate-900 ${isPricing ? 'text-slate-900' : 'text-slate-500'}`}
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">
              Log in
            </Link>
            <Button 
              onClick={() => navigate('/login')} 
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16">
        {children}
      </main>

      {/* Global Public Footer */}
      <footer className="bg-white py-12 border-t border-slate-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>&copy; {new Date().getFullYear()} MRDS Enterprise. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
