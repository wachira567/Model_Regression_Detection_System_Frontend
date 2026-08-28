import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, AlertTriangle, Bug, Code2, Database } from "lucide-react";
import { api } from "../lib/api";

export default function TraceExplorerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [traces, setTraces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadTraces(id);
    }
  }, [id]);

  const loadTraces = async (evalResultId: string) => {
    try {
      setLoading(true);
      const data = await api.getEvalTraces(evalResultId).catch(() => ([
        // Mock fallback if API not ready
        { id: "1", step_name: "Context Retrieval", step_order: 1, duration_ms: 120, output_payload: { chunks: [] } },
        { id: "2", step_name: "LLM Generation", step_order: 2, duration_ms: 850, error_message: "Hallucination detected", output_payload: { text: "I don't know" } }
      ]));
      setTraces(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center animate-pulse text-slate-400 font-medium">Loading execution trace...</div>;
  }

  const getStepIcon = (name: string) => {
    if (name.includes("Retrieval")) return <Database className="h-6 w-6 text-blue-500" />;
    if (name.includes("LLM") || name.includes("Generation")) return <Code2 className="h-6 w-6 text-purple-500" />;
    return <Bug className="h-6 w-6 text-rose-500" />;
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-full w-10 h-10 p-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Failure Forensics</h1>
          <p className="text-slate-500 mt-2 text-lg">Detailed execution trace for failed evaluation.</p>
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-6 space-y-12 pb-8">
        {traces.map((trace, index) => (
          <div key={trace.id} className="relative pl-10">
            <div className={`absolute -left-[21px] top-4 rounded-full p-2 bg-white border-2 ${trace.error_message ? 'border-rose-500' : 'border-slate-300'}`}>
              {getStepIcon(trace.step_name)}
            </div>
            
            <Card className={`border-none shadow-sm overflow-hidden rounded-2xl ${trace.error_message ? 'ring-2 ring-rose-500/20 bg-rose-50/30' : 'bg-white'}`}>
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-lg text-slate-900">Step {index + 1}: {trace.step_name}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  {trace.duration_ms.toFixed(1)}ms
                </div>
              </div>
              <CardContent className="p-6 space-y-6">
                
                {trace.error_message && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex gap-3 font-medium">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    {trace.error_message}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Input Payload</h4>
                    <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-emerald-400 text-sm font-mono leading-relaxed">
                        {trace.input_payload ? JSON.stringify(trace.input_payload, null, 2) : 'No input payload recorded'}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Output Payload</h4>
                    <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-indigo-400 text-sm font-mono leading-relaxed">
                        {trace.output_payload ? JSON.stringify(trace.output_payload, null, 2) : 'No output payload recorded'}
                      </pre>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        ))}
        
        {traces.length === 0 && (
          <div className="pl-10 text-slate-500 font-medium">No trace steps found for this evaluation result.</div>
        )}
      </div>
    </div>
  );
}
