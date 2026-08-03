import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LayoutDashboard, FileTerminal, Activity } from "lucide-react";
import DashboardPage from "./pages/DashboardPage";
import EvalRunDetailPage from "./pages/EvalRunDetailPage";
import PromptsPage from "./pages/PromptsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Activity className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">Model Regression Detetion</span>
            </div>
            <nav className="flex space-x-6">
              <Link to="/" className="text-slate-600 hover:text-slate-900 font-medium flex items-center space-x-2 transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/prompts" className="text-slate-600 hover:text-slate-900 font-medium flex items-center space-x-2 transition-colors">
                <FileTerminal className="h-4 w-4" />
                <span>Prompts</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/eval-runs/:runId" element={<EvalRunDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
