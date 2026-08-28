import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Plus, Search, Sparkles, Activity, Play, Square } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "../lib/api";

interface ExperimentVariant {
  id: string;
  prompt_config_id: string;
  traffic_percentage: number;
  is_baseline: boolean;
  is_winner: boolean | null;
}

interface Experiment {
  id: string;
  name: string;
  feature_id: string;
  status: string;
  primary_metric: string;
  created_at: string;
  variants: ExperimentVariant[];
}

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadExperiments();
  }, []);

  const loadExperiments = async () => {
    try {
      setLoading(true);
      // Fallback data if api is missing
      const data = await api.getExperiments().catch(() => [
        {
          id: "demo-123",
          name: "Onboarding Flow Subject Lines",
          feature_id: "email_subject_gen",
          status: "running",
          primary_metric: "relevance",
          created_at: new Date().toISOString(),
          variants: [
            { id: "v1", prompt_config_id: "p1", traffic_percentage: 50, is_baseline: true, is_winner: null },
            { id: "v2", prompt_config_id: "p2", traffic_percentage: 50, is_baseline: false, is_winner: null }
          ]
        },
        {
          id: "demo-456",
          name: "Legal Clause Extraction v2",
          feature_id: "legal_extraction",
          status: "completed",
          primary_metric: "accuracy",
          created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
          variants: [
            { id: "v3", prompt_config_id: "p3", traffic_percentage: 20, is_baseline: true, is_winner: false },
            { id: "v4", prompt_config_id: "p4", traffic_percentage: 80, is_baseline: false, is_winner: true }
          ]
        }
      ]);
      setExperiments(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = experiments.filter(e => e.feature_id.toLowerCase().includes(search.toLowerCase()) || e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">A/B Experiments</h1>
          <p className="text-slate-500 mt-2 text-lg">Test prompt variants against live traffic and declare statistical winners.</p>
        </div>
        <Button className="gap-2 h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
          <Plus className="h-5 w-5" />
          New Experiment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
          <div className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <FlaskConical className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{experiments.length}</h3>
            <p className="text-slate-500 font-medium">Total Experiments</p>
          </div>
        </Card>
        <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
          <div className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{experiments.filter(e => e.status === "running").length}</h3>
            <p className="text-slate-500 font-medium">Running Now</p>
          </div>
        </Card>
        <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
          <div className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{experiments.filter(e => e.status === "completed").length}</h3>
            <p className="text-slate-500 font-medium">Completed</p>
          </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FlaskConical className="h-5 w-5 text-indigo-600" />
            </div>
            Experiment Registry
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search experiments..." 
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6 font-bold text-slate-600">Name</TableHead>
                  <TableHead className="font-bold text-slate-600">Feature ID</TableHead>
                  <TableHead className="font-bold text-slate-600">Status</TableHead>
                  <TableHead className="font-bold text-slate-600">Variants</TableHead>
                  <TableHead className="font-bold text-slate-600">Primary Metric</TableHead>
                  <TableHead className="text-right pr-6 font-bold text-slate-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell className="pl-6"><div className="h-5 w-48 bg-slate-200 rounded"></div></TableCell>
                      <TableCell><div className="h-5 w-32 bg-slate-200 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-20 bg-slate-200 rounded-full"></div></TableCell>
                      <TableCell><div className="h-5 w-16 bg-slate-200 rounded"></div></TableCell>
                      <TableCell><div className="h-5 w-24 bg-slate-200 rounded"></div></TableCell>
                      <TableCell className="pr-6"><div className="h-8 w-20 bg-slate-200 rounded ml-auto"></div></TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20">
                      <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FlaskConical className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No experiments found</h3>
                      <p className="text-slate-500 max-w-sm mx-auto mb-6">Create an A/B test to scientifically determine your best prompts.</p>
                      <Button className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">
                        Create Experiment
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((e) => (
                    <TableRow key={e.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer" onClick={() => window.location.href = `/dashboard/experiments/${e.id}`}>
                      <TableCell className="pl-6 font-bold text-slate-900">
                        {e.name}
                        <div className="text-xs font-normal text-slate-400 mt-1">Started {new Date(e.created_at).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-600">{e.feature_id}</TableCell>
                      <TableCell>
                        {e.status === 'running' ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 font-semibold shadow-sm flex w-max items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Running
                          </Badge>
                        ) : e.status === 'completed' ? (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none px-3 font-semibold shadow-sm">Completed</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-600 border-slate-200 px-3 font-semibold">Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 items-center">
                          {e.variants.map((v, i) => (
                            <span key={v.id} className="px-2 py-0.5 text-xs font-bold rounded bg-slate-100 text-slate-600">
                              {v.traffic_percentage}%
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-600 flex items-center gap-2 mt-2 capitalize">
                        {e.primary_metric}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="sm" className="rounded-lg font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all">
                          View Results
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
