import { Outlet, Link, useLocation } from 'react-router-dom';
import { Book, Code, Component, Activity, ArrowLeft } from 'lucide-react';

export default function DocsLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Introduction', path: '/docs', icon: <Book className="w-4 h-4" />, exact: true },
    { name: 'Architecture', path: '/docs/architecture', icon: <Component className="w-4 h-4" /> },
    { name: 'Features', path: '/docs/features', icon: <Activity className="w-4 h-4" /> },
    { name: 'API Reference', path: '/docs/api', icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white fixed h-full z-10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="bg-slate-900 p-1.5 rounded-lg">
            <Book className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">MRDS Docs</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-2 px-3">
            Documentation
          </div>
          {navItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path || location.pathname === item.path + '/'
              : location.pathname.startsWith(item.path);
              
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
