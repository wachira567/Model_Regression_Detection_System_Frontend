import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp } from "lucide-react";
import { api } from "../lib/api";

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrends();
  }, []);

  const loadTrends = async () => {
    try {
      setLoading(true);
      const trends = await api.getAnalyticsTrends(7); // Last 7 days
      setData(trends);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Drift</h1>
        <p className="text-slate-500 mt-2">Monitor model performance, accuracy drift, and latency over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Accuracy Trend (Rolling 7-day)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center h-full text-slate-500">Loading data...</div>
              ) : data.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-500">No data available for the last 7 days.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-500" />
              Latency Trend (ms)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center h-full text-slate-500">Loading data...</div>
              ) : data.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-500">No data available for the last 7 days.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    <Line type="monotone" dataKey="latency" stroke="#6366f1" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
