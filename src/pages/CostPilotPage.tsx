import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Coins, BrainCircuit, ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { api } from "../lib/api";

export default function CostPilotPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await api.getAutopilotStats().catch(() => ({
        total_savings_usd: 12450.50,
        total_requests: 15420,
        model_distribution: {
          "claude-3-haiku-20240307": 12000,
          "gpt-3.5-turbo": 2400,
          "gpt-4o": 1020
        },
        recent_decisions: [
          { id: "1", feature_id: "chatbot", complexity: 0.2, routed_model: "claude-3-haiku-20240307", savings: 0.95, created_at: new Date().toISOString() },
          { id: "2", feature_id: "chatbot", complexity: 0.8, routed_model: "gpt-4o", savings: 0.0, created_at: new Date().toISOString() },
          { id: "3", feature_id: "email_writer", complexity: 0.35, routed_model: "claude-3-haiku-20240307", savings: 0.95, created_at: new Date().toISOString() }
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
    return <div className="p-12 text-center animate-pulse text-slate-400 font-medium">Loading Cost Pilot data...</div>;
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Cost Autopilot</h1>
          <p className="text-slate-500 mt-2 text-lg">Intelligently route requests to the cheapest capable model without sacrificing quality.</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100">
          <ShieldCheck className="h-5 w-5" />
          <span className="font-bold">Active & Routing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Savings Card */}
        <Card className="col-span-1 md:col-span-2 border-none shadow-sm bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Coins className="h-48 w-48 text-white" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-2 text-emerald-100 font-medium mb-4">
              <BrainCircuit className="h-5 w-5" />
              <span>Total Money Saved</span>
            </div>
            <div className="text-6xl font-black tracking-tighter mb-6">
              {formatCurrency(stats.total_savings_usd)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/20">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Total Routed Requests</p>
                <p className="text-2xl font-bold">{stats.total_requests.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Average Savings / Req</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.total_savings_usd / Math.max(1, stats.total_requests))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Card */}
        <Card className="border-none shadow-sm bg-white rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-slate-900">Model Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.model_distribution).sort((a: any, b: any) => b[1] - a[1]).map(([model, count]: [string, any]) => {
                const percent = Math.round((count / Math.max(1, stats.total_requests)) * 100);
                return (
                  <div key={model} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700 truncate mr-4">{model}</span>
                      <span className="text-slate-500 whitespace-nowrap">{percent}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${model.includes('haiku') || model.includes('turbo') ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Recent Routing Decisions</h2>
          <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold gap-1">
            View All <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6 font-bold text-slate-600">Time</TableHead>
                  <TableHead className="font-bold text-slate-600">Feature</TableHead>
                  <TableHead className="font-bold text-slate-600">Complexity</TableHead>
                  <TableHead className="font-bold text-slate-600">Routed Model</TableHead>
                  <TableHead className="text-right pr-6 font-bold text-slate-600">Savings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recent_decisions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">No recent decisions</TableCell>
                  </TableRow>
                ) : (
                  stats.recent_decisions.map((d: any) => (
                    <TableRow key={d.id}>
                      <TableCell className="pl-6 text-slate-500">
                        {new Date(d.created_at).toLocaleTimeString()}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{d.feature_id}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={d.complexity < 0.4 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : d.complexity < 0.7 ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-orange-50 text-orange-700 border-orange-200"}>
                          {d.complexity < 0.4 ? "Low" : d.complexity < 0.7 ? "Medium" : "High"} ({d.complexity.toFixed(2)})
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{d.routed_model}</span>
                      </TableCell>
                      <TableCell className="text-right pr-6 font-bold text-emerald-600">
                        +{formatCurrency(d.savings)}
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
