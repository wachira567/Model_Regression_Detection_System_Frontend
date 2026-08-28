import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, Target, Activity, Zap, Database } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EvalRunDetailPage() {
  const { runId } = useParams();
  const [run, setRun] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (runId) {
      loadData(runId);
    }
  }, [runId]);

  const loadData = async (id: string) => {
    try {
      const [runData, resultsData] = await Promise.all([
        api.getEvalRun(id),
        api.getEvalResults(id)
      ]);
      setRun(runData);
      setResults(resultsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-32 bg-slate-200 animate-pulse rounded-lg"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl"></div>)}
        </div>
        <div className="h-[400px] bg-slate-200 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  if (!run) {
    return <div className="p-12 text-center text-rose-500 font-bold bg-rose-50 rounded-2xl border border-rose-100">Eval run not found</div>;
  }

  const passedCases = results.filter(r => r.status === "pass");
  const failedCases = results.filter(r => r.status !== "pass");

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center space-x-3">
              <span>Run {run.id.split("-")[0]}</span>
              <Badge variant={run.status === 'completed' ? 'default' : run.status === 'failed' ? 'destructive' : 'secondary'} className="px-3 py-1 text-sm border-none shadow-sm">
                {run.status}
              </Badge>
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Triggered via <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{run.trigger_type}</span> on {new Date(run.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-t-4 border-t-emerald-500 shadow-sm border-x-slate-100 border-b-slate-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" /> Overall Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900">{((run.overall_accuracy || 0) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-indigo-500 shadow-sm border-x-slate-100 border-b-slate-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" /> Avg Relevance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900">{(run.avg_relevance_score || 0).toFixed(2)} <span className="text-xl text-slate-400 font-medium">/ 5.0</span></div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-amber-500 shadow-sm border-x-slate-100 border-b-slate-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Avg Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900">{(run.avg_latency_ms || 0).toFixed(0)} <span className="text-xl text-slate-400 font-medium">ms</span></div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-blue-500 shadow-sm border-x-slate-100 border-b-slate-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" /> Passed Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-slate-900">{run.passed_cases} <span className="text-xl text-slate-400 font-medium">/ {run.total_cases}</span></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
          <CardTitle className="text-xl font-bold text-slate-900">Detailed Test Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="p-4 border-b border-slate-100 overflow-x-auto">
              <TabsList className="bg-slate-100/80 p-1 h-12 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg font-semibold px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">All ({results.length})</TabsTrigger>
                <TabsTrigger value="passed" className="rounded-lg font-semibold px-6 text-emerald-600 data-[state=active]:bg-white data-[state=active]:shadow-sm">Passed ({passedCases.length})</TabsTrigger>
                <TabsTrigger value="failed" className="rounded-lg font-semibold px-6 text-rose-600 data-[state=active]:bg-white data-[state=active]:shadow-sm">Failed ({failedCases.length})</TabsTrigger>
              </TabsList>
            </div>
            
            {["all", "passed", "failed"].map(tabValue => {
              const displayResults = tabValue === "all" ? results : tabValue === "passed" ? passedCases : failedCases;
              return (
                <TabsContent key={tabValue} value={tabValue} className="m-0 focus-visible:outline-none">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="w-[120px] font-bold text-slate-600">Status</TableHead>
                          <TableHead className="font-bold text-slate-600">Test Case ID</TableHead>
                          <TableHead className="font-bold text-slate-600">Category Match</TableHead>
                          <TableHead className="font-bold text-slate-600">Relevance</TableHead>
                          <TableHead className="text-right font-bold text-slate-600">Latency</TableHead>
                          <TableHead className="text-right font-bold text-slate-600 pr-6">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayResults.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-slate-500 py-12 font-medium">
                              No test cases in this view.
                            </TableCell>
                          </TableRow>
                        ) : (
                          displayResults.map((res: any) => (
                            <TableRow key={res.id} className="hover:bg-slate-50/80 transition-colors">
                              <TableCell className="pl-6">
                                {res.status === "pass" ? (
                                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 font-semibold shadow-sm">Pass</Badge>
                                ) : (
                                  <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none px-3 font-semibold shadow-sm">Fail</Badge>
                                )}
                              </TableCell>
                              <TableCell className="font-medium text-slate-900 truncate max-w-[200px]" title={res.input.email_text || ""}>
                                <div className="font-mono text-sm bg-slate-100 px-2 py-1 rounded inline-block">
                                  {res.test_case_id}
                                </div>
                              </TableCell>
                              <TableCell>
                                {res.category_match ? (
                                  <div className="flex items-center gap-2 text-emerald-600 font-medium">
                                    <CheckCircle2 className="h-5 w-5" /> Match
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-rose-500 font-medium">
                                    <XCircle className="h-5 w-5" /> Mismatch
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <span className={`px-2.5 py-1 rounded-md text-sm font-bold ${res.relevance_score >= 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                  {res.relevance_score} / 5
                                </span>
                              </TableCell>
                              <TableCell className="text-right font-mono font-medium text-slate-600">
                                {(res.latency_ms || 0).toFixed(0)}ms
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                {res.status === "fail" && (
                                  <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/traces/${res.id}`)} className="h-8 rounded-lg font-bold text-rose-600 border-rose-200 hover:bg-rose-50">
                                    View Trace
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
