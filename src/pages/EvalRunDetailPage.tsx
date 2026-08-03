import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
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
    return <div className="p-8 text-center text-slate-500">Loading details...</div>;
  }

  if (!run) {
    return <div className="p-8 text-center text-rose-500">Eval run not found</div>;
  }

  const passedCases = results.filter(r => r.status === "pass");
  const failedCases = results.filter(r => r.status !== "pass");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-slate-400 hover:text-slate-900 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center space-x-3">
            <span>Run {run.id.split("-")[0]}</span>
            <Badge variant={run.status === 'completed' ? 'default' : run.status === 'failed' ? 'destructive' : 'secondary'}>
              {run.status}
            </Badge>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Triggered via {run.trigger_type} on {new Date(run.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{((run.overall_accuracy || 0) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg Relevance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{(run.avg_relevance_score || 0).toFixed(2)} / 5.0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{(run.avg_latency_ms || 0).toFixed(0)} ms</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Passed Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{run.passed_cases} / {run.total_cases}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Test Case Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({results.length})</TabsTrigger>
              <TabsTrigger value="passed" className="text-emerald-600">Passed ({passedCases.length})</TabsTrigger>
              <TabsTrigger value="failed" className="text-rose-600">Failed ({failedCases.length})</TabsTrigger>
            </TabsList>
            
            {["all", "passed", "failed"].map(tabValue => {
              const displayResults = tabValue === "all" ? results : tabValue === "passed" ? passedCases : failedCases;
              return (
                <TabsContent key={tabValue} value={tabValue}>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead>Test Case</TableHead>
                          <TableHead>Category Match</TableHead>
                          <TableHead>Relevance</TableHead>
                          <TableHead className="text-right">Latency</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayResults.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                              No cases found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          displayResults.map((res: any) => (
                            <TableRow key={res.id}>
                              <TableCell>
                                {res.status === "pass" ? (
                                  <Badge variant="default" className="bg-emerald-500">Pass</Badge>
                                ) : (
                                  <Badge variant="destructive">Fail</Badge>
                                )}
                              </TableCell>
                              <TableCell className="font-medium text-slate-900 truncate max-w-[200px]" title={res.input.email_text || ""}>
                                {res.test_case_id}
                              </TableCell>
                              <TableCell>
                                {res.category_match ? (
                                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-rose-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                <span className={res.relevance_score >= 4 ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                                  {res.relevance_score}/5
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                {(res.latency_ms || 0).toFixed(0)} ms
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
