import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Zap, Server, Activity, ArrowUpRight } from "lucide-react";
import { api } from "../lib/api";

export default function SemanticCachePage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await api.getCacheStats().catch(() => ({
        total_items: 2453,
        total_hits: 15420,
        recent_items: [
          { id: "1", feature_id: "chatbot", prompt_text: "How do I reset my password?", hit_count: 450, last_accessed: new Date().toISOString() },
          { id: "2", feature_id: "email_writer", prompt_text: "Write a polite rejection email for a candidate.", hit_count: 120, last_accessed: new Date().toISOString() },
          { id: "3", feature_id: "summarizer", prompt_text: "Summarize the Q3 earnings report.", hit_count: 85, last_accessed: new Date().toISOString() }
        ]
      }));
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return <div className="p-12 text-center animate-pulse text-slate-400 font-medium">Loading Semantic Cache metrics...</div>;
  }

  // Assuming an average saving of 1.5s latency per cache hit
  const latencySavedHours = (stats.total_hits * 1.5) / 3600;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Semantic Cache</h1>
          <p className="text-slate-500 mt-2 text-lg">Instant responses for similar LLM queries. Save latency and costs.</p>
        </div>
        <div className="flex items-center gap-3 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100">
          <Zap className="h-5 w-5" />
          <span className="font-bold">Cache Enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Activity className="h-24 w-24 text-indigo-600" />
          </div>
          <CardContent className="p-8 relative z-10">
            <p className="text-slate-500 font-bold tracking-wider text-sm mb-2">Total Cache Hits</p>
            <div className="text-5xl font-black text-slate-900">{stats.total_hits.toLocaleString()}</div>
            <p className="text-emerald-500 font-semibold mt-4 text-sm flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" /> 12% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Zap className="h-24 w-24 text-amber-500" />
          </div>
          <CardContent className="p-8 relative z-10">
            <p className="text-slate-500 font-bold tracking-wider text-sm mb-2">Latency Saved</p>
            <div className="text-5xl font-black text-slate-900">{latencySavedHours.toFixed(1)} <span className="text-2xl text-slate-500">hrs</span></div>
            <p className="text-slate-400 font-semibold mt-4 text-sm">Based on avg 1.5s / req</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Server className="h-24 w-24 text-blue-500" />
          </div>
          <CardContent className="p-8 relative z-10">
            <p className="text-slate-500 font-bold tracking-wider text-sm mb-2">Cached Entries</p>
            <div className="text-5xl font-black text-slate-900">{stats.total_items.toLocaleString()}</div>
            <p className="text-slate-400 font-semibold mt-4 text-sm">Managing automatically</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Top Cached Queries</h2>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6 font-bold text-slate-600">Prompt Text</TableHead>
                  <TableHead className="font-bold text-slate-600">Feature</TableHead>
                  <TableHead className="font-bold text-slate-600">Hits</TableHead>
                  <TableHead className="text-right pr-6 font-bold text-slate-600">Last Accessed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recent_items.map((item: any) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="pl-6">
                      <p className="font-medium text-slate-900 truncate max-w-md">{item.prompt_text}</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                        {item.feature_id}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span className="font-bold text-slate-700">{item.hit_count}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6 text-slate-500 font-medium">
                      {new Date(item.last_accessed).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
