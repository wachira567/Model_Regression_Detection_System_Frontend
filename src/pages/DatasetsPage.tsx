import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "../lib/api";
import { Pagination } from "@/components/Pagination";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [_loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDatasets();
  }, [page, search]);

  const loadDatasets = async () => {
    try {
      setLoading(true);
      const data = await api.getDatasets(page, 10, search);
      setDatasets(data.items);
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
          <h1 className="text-3xl font-bold tracking-tight">Golden Datasets</h1>
          <p className="text-slate-500 mt-2">Manage test cases used for regression evaluations.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Upload Dataset
        </Button>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 m-0">
            <Database className="h-5 w-5 text-indigo-600" />
            Available Datasets
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search datasets..." 
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
                <TableHead>Dataset Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Test Cases</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.version}</TableCell>
                  <TableCell>{d.cases}</TableCell>
                  <TableCell>{new Date(d.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Cases</Button>
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
