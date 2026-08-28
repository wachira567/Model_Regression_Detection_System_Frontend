import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Global Public Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 p-1.5 rounded-lg group-hover:bg-indigo-600 transition-colors duration-300 group-hover:scale-105">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MRDS</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium transition-colors hover:text-slate-900 ${location.pathname === link.path ? 'text-slate-900' : 'text-slate-500'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Button 
              onClick={() => navigate('/login')} 
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
            >
              Get Started Free
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col md:hidden"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500 hover:text-slate-900 bg-slate-50 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-bold transition-colors ${location.pathname === link.path ? 'text-indigo-600' : 'text-slate-900'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4 border-t border-slate-100 pt-6">
                <Button 
                  variant="outline"
                  onClick={() => { setMobileMenuOpen(false); navigate('/login'); }} 
                  className="w-full h-12 rounded-full font-semibold border-slate-200"
                >
                  Log in
                </Button>
                <Button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/login'); }} 
                  className="w-full h-12 bg-slate-900 text-white rounded-full font-semibold shadow-md"
                >
                  Get Started Free
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16">
        {children}
      </main>

      {/* Comprehensive Footer */}
      <footer className="bg-slate-50 py-16 mt-auto border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="bg-slate-900 p-1.5 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">MRDS</span>
              </Link>
              <p className="text-slate-500 text-sm mb-6 max-w-xs">
                The ultimate safety net for generative AI. Catch regressions before they reach your users.
              </p>
              <div className="flex items-center gap-4">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/features" className="hover:text-indigo-600 transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">How it works</Link></li>
                <li><Link to="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>&copy; {new Date().getFullYear()} MRDS Enterprise. All rights reserved.</div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
