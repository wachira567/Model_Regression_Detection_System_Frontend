import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Flag, ShieldAlert } from "lucide-react";
import { api } from "../lib/api";

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlags();
  }, []);

  const loadFlags = async () => {
    try {
      setLoading(true);
      const data = await api.getFlags().catch(() => ([
        { id: "1", name: "new-chatbot-prompt", feature_id: "chatbot", is_enabled: true, rollout_percentage: 25, updated_at: new Date().toISOString() },
        { id: "2", name: "v2-email-writer", feature_id: "email_writer", is_enabled: true, rollout_percentage: 100, updated_at: new Date().toISOString() },
        { id: "3", name: "experimental-summarizer", feature_id: "summarizer", is_enabled: false, rollout_percentage: 0, updated_at: new Date().toISOString() },
      ]));
      setFlags(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleFlag = async (id: string, currentStatus: boolean) => {
    // Optimistic update
    setFlags(flags.map(f => f.id === id ? { ...f, is_enabled: !currentStatus } : f));
    try {
      await api.updateFlag(id, { is_enabled: !currentStatus });
    } catch (e) {
      // Revert on failure
      setFlags(flags.map(f => f.id === id ? { ...f, is_enabled: currentStatus } : f));
    }
  };

  const updateRollout = async (id: string, newPercentage: number) => {
    setFlags(flags.map(f => f.id === id ? { ...f, rollout_percentage: newPercentage } : f));
    try {
      await api.updateFlag(id, { rollout_percentage: newPercentage });
    } catch (e) {
      loadFlags();
    }
  };

  if (loading) {
    return <div className="p-12 text-center animate-pulse text-slate-400 font-medium">Loading Feature Flags...</div>;
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Feature Flags</h1>
          <p className="text-slate-500 mt-2 text-lg">Safely roll out prompt updates with percentage-based traffic splitting.</p>
        </div>
        <Button className="gap-2 h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
          <Flag className="h-5 w-5" />
          Create Flag
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6 font-bold text-slate-600">Flag Name</TableHead>
                  <TableHead className="font-bold text-slate-600">Status</TableHead>
                  <TableHead className="font-bold text-slate-600 w-64">Rollout Percentage</TableHead>
                  <TableHead className="font-bold text-slate-600">Last Updated</TableHead>
                  <TableHead className="text-right pr-6 font-bold text-slate-600">Emergency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flags.map((flag) => (
                  <TableRow key={flag.id} className="hover:bg-slate-50/50">
                    <TableCell className="pl-6">
                      <div>
                        <p className="font-bold text-slate-900">{flag.name}</p>
                        <p className="text-sm text-slate-500">Feature: {flag.feature_id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <input 
                        type="checkbox"
                        checked={flag.is_enabled} 
                        onChange={() => toggleFlag(flag.id, flag.is_enabled)} 
                        className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={flag.rollout_percentage} 
                          disabled={!flag.is_enabled}
                          onChange={(e) => updateRollout(flag.id, parseInt(e.target.value))}
                          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${flag.is_enabled ? 'bg-indigo-200' : 'bg-slate-200'}`}
                        />
                        <span className="font-bold text-slate-700 w-12 text-right">{flag.rollout_percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 font-medium">
                      {new Date(flag.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          updateRollout(flag.id, 0);
                          toggleFlag(flag.id, true);
                        }}
                        className="rounded-lg font-bold text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 gap-2"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        Kill Switch
                      </Button>
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
