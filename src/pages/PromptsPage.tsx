import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileTerminal, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "../lib/api";
import { Pagination } from "@/components/Pagination";
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
  const [_loading, setLoading] = useState(true);
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prompt Configurations</h1>
          <p className="text-slate-500 mt-2">Manage versions of your LLM prompts and models.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Prompt
        </Button>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 m-0">
            <FileTerminal className="h-5 w-5 text-blue-600" />
            Active Prompts
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search prompts..." 
              className="pl-9 h-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature ID</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prompts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.feature_id}</TableCell>
                  <TableCell>{p.version}</TableCell>
                  <TableCell>{p.model}</TableCell>
                  <TableCell>
                    {p.is_active ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Archived</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination 
            page={page} 
            pages={pages} 
            total={total} 
            onPageChange={setPage} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
