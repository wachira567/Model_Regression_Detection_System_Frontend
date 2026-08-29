import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileTerminal, Plus, Search, Sparkles, FlaskConical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "../lib/api";
import { Pagination } from "@/components/Pagination";
import { motion } from "framer-motion";

interface PromptConfig {
  id: string;
  feature_id: string;
  version: string;
  model: string;
  is_active: boolean;
  created_at: string;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPrompts();
  }, [page, search]);

  const loadPrompts = async () => {
    try {
      setLoading(true);
      const data = await api.getPrompts(page, 10, search);
      setPrompts(data.items);
      setPages(data.pages);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Prompt Configurations</h1>
          <p className="text-slate-500 mt-2 text-lg">Manage versions of your LLM prompts and models across features.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 h-12 px-6 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-xl font-bold transition-all w-full sm:w-auto">
            <Link to="/dashboard/experiments/new" className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              New A/B Test
            </Link>
          </Button>
          <Button className="gap-2 h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
            <Plus className="h-5 w-5" />
            New Prompt
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-none shadow-xl glass-panel overflow-hidden rounded-3xl">
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileTerminal className="h-5 w-5 text-blue-500" />
              </div>
              Active Prompts
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Search by feature ID..." 
                className="pl-10 h-11 bg-white/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 backdrop-blur-md"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
          <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6 font-bold text-slate-600">Feature ID</TableHead>
                  <TableHead className="font-bold text-slate-600">Version</TableHead>
                  <TableHead className="font-bold text-slate-600">Model</TableHead>
                  <TableHead className="font-bold text-slate-600">Status</TableHead>
                  <TableHead className="font-bold text-slate-600">Created</TableHead>
                  <TableHead className="text-right pr-6 font-bold text-slate-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell className="pl-6"><div className="h-5 w-48 bg-slate-200 rounded"></div></TableCell>
                      <TableCell><div className="h-5 w-16 bg-slate-200 rounded"></div></TableCell>
                      <TableCell><div className="h-5 w-32 bg-slate-200 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-20 bg-slate-200 rounded-full"></div></TableCell>
                      <TableCell><div className="h-5 w-32 bg-slate-200 rounded"></div></TableCell>
                      <TableCell className="pr-6"><div className="h-8 w-20 bg-slate-200 rounded ml-auto"></div></TableCell>
                    </TableRow>
                  ))
                ) : prompts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20">
                      <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No prompts configured</h3>
                      <p className="text-slate-500 max-w-sm mx-auto mb-6">Link your system prompts to track versions and evaluate them against your datasets.</p>
                      <Button className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">
                        Create Configuration
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  prompts.map((p) => (
                    <TableRow key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="pl-6 font-bold text-slate-900">{p.feature_id}</TableCell>
                      <TableCell>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-xs rounded-md font-medium">
                          v{p.version}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-slate-600 flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {p.model}
                      </TableCell>
                      <TableCell>
                        {p.is_active ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 font-semibold shadow-sm">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none px-3 font-semibold shadow-sm">Archived</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-500 font-medium">{new Date(p.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="outline" size="sm" className="rounded-lg font-semibold text-slate-700 border-slate-200 hover:bg-slate-100 transition-all">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30 backdrop-blur-md">
            <Pagination 
              page={page} 
              pages={pages} 
              total={total} 
              onPageChange={setPage} 
            />
          </div>
        </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
