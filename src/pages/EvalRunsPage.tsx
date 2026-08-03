import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, CheckCircle2, XCircle, Clock, Search } from "lucide-react";
import { Pagination } from "@/components/Pagination";
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

  const handleTriggerRun = async () => {
    setTriggering(true);
    try {
      await api.triggerEvalRun("email_classifier");
      // reload after 2 seconds to see pending state
      setTimeout(loadRuns, 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eval Runs</h1>
          <p className="text-slate-500 mt-2">View all your historical evaluation runs and manually trigger new ones.</p>
        </div>
        <Button onClick={handleTriggerRun} disabled={triggering} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
          <Play className="h-4 w-4" />
          {triggering ? "Starting..." : "Run Eval (Email Classifier)"}
        </Button>
      </div>



      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between py-3">
          <CardTitle className="text-lg m-0">Recent Eval Runs</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search runs..." 
              className="pl-9 h-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to page 1 on search
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-500">Loading runs...</div>
            ) : runs.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No runs yet. Trigger one to start!</div>
            ) : (
              runs.map((run) => (
                <div key={run.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {run.status === 'completed' ? (
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      ) : run.status === 'failed' ? (
                        <XCircle className="h-8 w-8 text-rose-500" />
                      ) : (
                        <Clock className="h-8 w-8 text-amber-500 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{run.id.split("-")[0]} - {run.trigger_type}</div>
                      <div className="text-sm text-slate-500">
                        {new Date(run.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  {run.status === 'completed' && (
                    <div className="hidden md:flex space-x-8 text-sm">
                      <div>
                        <div className="text-slate-500">Accuracy</div>
                        <div className="font-semibold">{((run.overall_accuracy || 0) * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Relevance</div>
                        <div className="font-semibold">{(run.avg_relevance_score || 0).toFixed(2)} / 5</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Latency</div>
                        <div className="font-semibold">{(run.avg_latency_ms || 0).toFixed(0)} ms</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <Badge variant={run.status === 'completed' ? 'default' : run.status === 'failed' ? 'destructive' : 'secondary'}>
                      {run.status}
                    </Badge>
                    <Link to={`/eval-runs/${run.id}`}>
                      <Button variant="ghost" size="icon" className="hover:bg-slate-200">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination 
            page={page} 
            pages={pages} 
            total={total} 
            onPageChange={setPage} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
