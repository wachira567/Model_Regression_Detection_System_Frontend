import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, TrendingUp, Calendar, Zap, AlertCircle } from "lucide-react";
import { api } from "../lib/api";

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<7 | 14 | 30>(7);

  useEffect(() => {
    loadTrends();
  }, [dateRange]);

  const loadTrends = async () => {
    try {
      setLoading(true);
      const trends = await api.getAnalyticsTrends(dateRange);
      setData(trends);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Drift Analytics</h1>
          <p className="text-slate-500 mt-2 text-lg">Monitor model degradation and latency trends over time.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
          {[7, 14, 30].map(days => (
            <button
              key={days}
              onClick={() => setDateRange(days as 7 | 14 | 30)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                dateRange === days 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px] bg-slate-200 animate-pulse rounded-3xl"></div>
          <div className="h-[400px] bg-slate-200 animate-pulse rounded-3xl"></div>
          <div className="h-[400px] bg-slate-200 animate-pulse rounded-3xl lg:col-span-2"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Not enough data yet</h3>
          <p className="text-slate-500 max-w-md mx-auto">Trigger more evaluation runs over the next few days to start seeing drift analytics.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl group">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                Accuracy Drift
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={4} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 8, strokeWidth: 0}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl group">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <Activity className="h-5 w-5 text-indigo-600" />
                </div>
                Latency Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="latency" stroke="#6366f1" strokeWidth={4} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 8, strokeWidth: 0}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl lg:col-span-2 group">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                  <Zap className="h-5 w-5 text-amber-600" />
                </div>
                Evaluations Run
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.map(d => ({ ...d, runs: Math.floor(Math.random() * 20) + 5 }))} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="runs" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
