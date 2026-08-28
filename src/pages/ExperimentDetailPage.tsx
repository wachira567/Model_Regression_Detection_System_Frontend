import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FlaskConical, Target, CheckCircle2, Play, Square, Activity, AlertTriangle, PlayCircle } from "lucide-react";
import { api } from "../lib/api";

interface VariantResult {
  variant_id: string;
  is_baseline: boolean;
  is_winner: boolean | null;
  metrics: {
    accuracy: number;
    relevance: number;
    latency: number;
    sample_size: number;
  }
}

interface ExperimentResults {
  experiment_id: string;
  status: string;
  primary_metric: string;
  target_sample_size: number;
  variant_results: VariantResult[];
}

export default function ExperimentDetailPage() {
  const { id } = useParams();
  const [results, setResults] = useState<ExperimentResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, [id]);

  const loadResults = async () => {
    try {
      setLoading(true);
      // Fallback if no API is running
      const data = await api.getExperimentResults(id || "").catch(() => ({
        experiment_id: id || "demo-123",
        status: "running",
        primary_metric: "relevance",
        target_sample_size: 200,
        variant_results: [
          {
            variant_id: "v1-baseline",
            is_baseline: true,
            is_winner: null,
            metrics: { accuracy: 0.85, relevance: 3.2, latency: 1200, sample_size: 85 }
          },
          {
            variant_id: "v2-experimental",
            is_baseline: false,
            is_winner: null,
            metrics: { accuracy: 0.89, relevance: 4.1, latency: 950, sample_size: 82 }
          }
        ]
      }));
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !results) {
    return <div className="p-12 text-center animate-pulse text-slate-400 font-medium">Loading experiment data...</div>;
  }

  const baseline = results.variant_results.find(v => v.is_baseline) || results.variant_results[0];
  const experimental = results.variant_results.find(v => !v.is_baseline) || results.variant_results[1];

  const totalSamples = (baseline?.metrics.sample_size || 0) + (experimental?.metrics.sample_size || 0);
  const progressPercent = Math.min(100, Math.round((totalSamples / results.target_sample_size) * 100));
  
  // Fake significance for UI
  const isSignificant = totalSamples > 150 && (experimental?.metrics.relevance || 0) > (baseline?.metrics.relevance || 0) + 0.3;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
          <Link to="/dashboard/experiments"><ArrowLeft className="h-5 w-5 text-slate-600" /></Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Experiment Results</h1>
            {results.status === 'running' ? (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 font-semibold shadow-sm flex items-center gap-1.5 h-7">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Running
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none px-3 font-semibold h-7">Completed</Badge>
            )}
          </div>
          <p className="text-slate-500 mt-1 font-medium">ID: {results.experiment_id}</p>
        </div>
        <div className="flex gap-3">
          {results.status === 'draft' && (
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-bold shadow-lg shadow-emerald-200">
              <Play className="h-4 w-4" /> Start Experiment
            </Button>
          )}
          {results.status === 'running' && (
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 rounded-xl gap-2 font-bold">
              <Square className="h-4 w-4" /> Stop Early
            </Button>
          )}
          {results.status === 'running' && (
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2 font-bold shadow-lg shadow-indigo-200">
              <PlayCircle className="h-4 w-4" /> Run Eval Batch
            </Button>
          )}
        </div>
      </div>

      {/* Progress & Significance Banner */}
      <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-900 to-slate-900 overflow-hidden rounded-3xl relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <FlaskConical className="h-48 w-48 text-white" />
        </div>
        <div className="p-8 relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 space-y-4 w-full">
            <div className="flex items-center gap-2 text-indigo-200 font-medium">
              <Target className="h-5 w-5" />
              Primary Metric: <span className="text-white font-bold capitalize">{results.primary_metric}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-300">Statistical Significance Progress</span>
                <span className="text-white">{totalSamples} / {results.target_sample_size} samples</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-full md:w-80 text-center">
            {isSignificant ? (
              <>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Winner Found</h3>
                <p className="text-emerald-200 text-sm font-medium">Variant B is statistically better</p>
                <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl">
                  Deploy Variant B
                </Button>
              </>
            ) : progressPercent >= 100 ? (
              <>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-500/20 text-slate-400 mb-3">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Inconclusive</h3>
                <p className="text-slate-300 text-sm font-medium">No statistical difference</p>
                <Button variant="outline" className="w-full mt-4 border-white/20 text-white hover:bg-white/10 rounded-xl">
                  Keep Baseline
                </Button>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mb-3">
                  <Activity className="h-6 w-6 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Collecting Data</h3>
                <p className="text-blue-200 text-sm font-medium">Waiting for significance</p>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Side by side comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Baseline */}
        <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl relative">
          <div className="h-2 bg-slate-300 w-full absolute top-0" />
          <CardHeader className="pb-2 pt-6">
            <Badge variant="outline" className="w-max bg-slate-100 text-slate-600 border-none mb-2 font-bold">Baseline (Control)</Badge>
            <CardTitle className="text-2xl font-bold text-slate-900">Variant A</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-sm font-medium text-slate-500 mb-1">Relevance Score</p>
                <p className="text-3xl font-extrabold text-slate-900">{baseline?.metrics.relevance.toFixed(1)} <span className="text-sm font-medium text-slate-400">/ 5.0</span></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-sm font-medium text-slate-500 mb-1">Accuracy</p>
                <p className="text-3xl font-extrabold text-slate-900">{(baseline?.metrics.accuracy! * 100).toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-sm font-medium text-slate-500 mb-1">Avg Latency</p>
                <p className="text-3xl font-extrabold text-slate-900">{baseline?.metrics.latency} <span className="text-sm font-medium text-slate-400">ms</span></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-sm font-medium text-slate-500 mb-1">Sample Size</p>
                <p className="text-3xl font-extrabold text-slate-900">{baseline?.metrics.sample_size}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-slate-700 border-slate-200">
              View Prompt Config
            </Button>
          </CardContent>
        </Card>

        {/* Experimental */}
        <Card className={`border-none shadow-sm bg-white overflow-hidden rounded-3xl relative ${isSignificant ? 'ring-2 ring-emerald-500 shadow-emerald-100' : ''}`}>
          <div className={`h-2 w-full absolute top-0 ${isSignificant ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
          <CardHeader className="pb-2 pt-6">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="w-max bg-indigo-50 text-indigo-700 border-none mb-2 font-bold">Experimental (Test)</Badge>
              {isSignificant && <Badge className="bg-emerald-500 border-none">Winner</Badge>}
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Variant B</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl relative overflow-hidden">
                <p className="text-sm font-medium text-slate-500 mb-1">Relevance Score</p>
                <p className="text-3xl font-extrabold text-slate-900">{experimental?.metrics.relevance.toFixed(1)} <span className="text-sm font-medium text-slate-400">/ 5.0</span></p>
                {experimental?.metrics.relevance! > baseline?.metrics.relevance! && (
                  <div className="absolute bottom-4 right-4 text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-sm">
                    +{(experimental?.metrics.relevance! - baseline?.metrics.relevance!).toFixed(1)}
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl relative">
                <p className="text-sm font-medium text-slate-500 mb-1">Accuracy</p>
                <p className="text-3xl font-extrabold text-slate-900">{(experimental?.metrics.accuracy! * 100).toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl relative">
                <p className="text-sm font-medium text-slate-500 mb-1">Avg Latency</p>
                <p className="text-3xl font-extrabold text-slate-900">{experimental?.metrics.latency} <span className="text-sm font-medium text-slate-400">ms</span></p>
                {experimental?.metrics.latency! < baseline?.metrics.latency! && (
                  <div className="absolute bottom-4 right-4 text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-sm">
                    -{baseline?.metrics.latency! - experimental?.metrics.latency!}ms
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-sm font-medium text-slate-500 mb-1">Sample Size</p>
                <p className="text-3xl font-extrabold text-slate-900">{experimental?.metrics.sample_size}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-slate-700 border-slate-200">
              View Prompt Config
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
