import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, CheckCircle2, XCircle, Clock, Search, Target, Zap, Activity } from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { CountUp } from "@/lib/AnimationUtils";

export default function EvalRunsPage() {
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRuns();
  }, [page, search]);

  const loadRuns = async () => {
    try {
      setLoading(true);
      const data = await api.getEvalRuns(page, 10, search);
      setRuns(data.items);
      setPages(data.pages);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerRun = async (evalMode: string = "fast") => {
    const featureId = window.prompt("Enter feature ID to evaluate (e.g., email_classifier):", "email_classifier");
    if (!featureId) return;
    
    setTriggering(true);
    try {
      await api.triggerEvalRun(featureId, evalMode);
      setTimeout(loadRuns, 2000);
      alert(`Started evaluation run for ${featureId}`);
    } catch (e: any) {
      console.error(e);
      alert(e.response?.data?.detail || "Failed to trigger evaluation");
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Evaluation Runs</h1>
          <p className="text-slate-500 mt-2 text-lg">Monitor model performance across all deployments.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            className="h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            id="evalModeSelect"
          >
            <option value="fast">⚡ Fast Pass (1x Cost)</option>
            <option value="deep">🧠 Deep Agentic Audit (3x Cost)</option>
          </select>
          <Button onClick={() => {
            const selectEl = document.getElementById("evalModeSelect") as HTMLSelectElement;
            handleTriggerRun(selectEl.value);
          }} disabled={triggering} className="gap-2 h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
            <Play className="h-5 w-5" fill="currentColor" />
            {triggering ? "Starting Run..." : "Run Evaluation"}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500 rounded-full blur-[50px] opacity-10"></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-600">Avg Accuracy</h3>
            </div>
            <div className="text-4xl font-extrabold text-slate-900"><CountUp end={92} suffix="%" /></div>
            <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <Activity className="h-4 w-4" /> +2.4% this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500 rounded-full blur-[50px] opacity-10"></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-600">Total Runs</h3>
            </div>
            <div className="text-4xl font-extrabold text-slate-900"><CountUp end={total} /></div>
            <p className="text-sm text-slate-500 font-medium mt-2">Across all models</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500 rounded-full blur-[50px] opacity-10"></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-slate-600">Avg Latency</h3>
            </div>
            <div className="text-4xl font-extrabold text-slate-900"><CountUp end={245} suffix="ms" /></div>
            <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <Activity className="h-4 w-4" /> -12ms this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">Recent Runs</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search by ID or trigger..." 
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {loading ? (
              // Skeleton Loader
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="p-6 flex items-center justify-between animate-pulse">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div>
                      <div className="w-32 h-5 bg-slate-200 rounded mb-2"></div>
                      <div className="w-24 h-4 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : runs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No runs found</h3>
                <p className="text-slate-500">Trigger an evaluation to see results here.</p>
              </div>
            ) : (
              runs.map((run) => (
                <div key={run.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-slate-50/80 transition-colors group">
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <div className="shrink-0">
                      {run.status === 'completed' ? (
                        <div className="bg-emerald-100 p-3 rounded-full"><CheckCircle2 className="h-6 w-6 text-emerald-600" /></div>
                      ) : run.status === 'failed' ? (
                        <div className="bg-rose-100 p-3 rounded-full"><XCircle className="h-6 w-6 text-rose-600" /></div>
                      ) : (
                        <div className="bg-amber-100 p-3 rounded-full"><Clock className="h-6 w-6 text-amber-600 animate-pulse" /></div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg flex items-center gap-3">
                        {run.id.split("-")[0]}
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-medium border-none">{run.trigger_type}</Badge>
                      </div>
                      <div className="text-sm text-slate-500 mt-1">
                        {new Date(run.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                    </div>
                  </div>
                  
                  {run.status === 'completed' && (
                    <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-12 mb-4 md:mb-0">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Accuracy</div>
                        <div className="font-bold text-slate-900 text-lg">{((run.overall_accuracy || 0) * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Relevance</div>
                        <div className="font-bold text-slate-900 text-lg">{(run.avg_relevance_score || 0).toFixed(2)}<span className="text-sm text-slate-400">/5</span></div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Latency</div>
                        <div className="font-bold text-slate-900 text-lg">{(run.avg_latency_ms || 0).toFixed(0)}<span className="text-sm text-slate-400">ms</span></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end w-full md:w-auto">
                    <Link to={`/dashboard/eval-runs/${run.id}`} className="w-full md:w-auto">
                      <Button variant="outline" className="w-full md:w-auto gap-2 rounded-xl font-semibold border-slate-200 text-slate-700 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-all">
                        View Details <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <Pagination 
              page={page} 
              pages={pages} 
              total={total} 
              onPageChange={setPage} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
