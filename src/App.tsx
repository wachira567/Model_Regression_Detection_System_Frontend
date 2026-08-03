import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LayoutDashboard, FileTerminal, Activity, Database } from "lucide-react";
import EvalRunsPage from "./pages/EvalRunsPage";
import EvalRunDetailPage from "./pages/EvalRunDetailPage";
import PromptsPage from "./pages/PromptsPage";
import DatasetsPage from "./pages/DatasetsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navbar */}
        <header className="bg-slate-900 shadow-sm border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-slate-900" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">MRDS</h1>
            </div>
            <nav className="flex space-x-6">
              <Link to="/" className="text-slate-300 hover:text-emerald-400 font-medium flex items-center space-x-2 transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                <span>Eval Runs</span>
              </Link>
              <Link to="/analytics" className="text-slate-300 hover:text-emerald-400 font-medium flex items-center space-x-2 transition-colors">
                <Activity className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
              <Link to="/prompts" className="text-slate-300 hover:text-emerald-400 font-medium flex items-center space-x-2 transition-colors">
                <FileTerminal className="h-4 w-4" />
                <span>Prompts</span>
              </Link>
              <Link to="/datasets" className="text-slate-300 hover:text-emerald-400 font-medium flex items-center space-x-2 transition-colors">
                <Database className="h-4 w-4" />
                <span>Datasets</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<EvalRunsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/datasets" element={<DatasetsPage />} />
            <Route path="/eval-runs/:runId" element={<EvalRunDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
