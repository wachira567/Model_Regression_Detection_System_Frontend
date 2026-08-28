import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Plus, Search, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "../lib/api";
import { Pagination } from "@/components/Pagination";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Golden Datasets</h1>
          <p className="text-slate-500 mt-2 text-lg">Manage the ground truth test cases used for your evaluations.</p>
        </div>
        <Button className="gap-2 h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
          <Plus className="h-5 w-5" />
          Upload Dataset
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Database className="h-5 w-5 text-indigo-600" />
            </div>
            Available Datasets
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search datasets by name..." 
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
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
                  <TableHead className="pl-6 font-bold text-slate-600">Dataset Name</TableHead>
                  <TableHead className="font-bold text-slate-600">Version</TableHead>
                  <TableHead className="font-bold text-slate-600">Test Cases</TableHead>
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
                      <TableCell><div className="h-5 w-24 bg-slate-200 rounded"></div></TableCell>
                      <TableCell><div className="h-5 w-32 bg-slate-200 rounded"></div></TableCell>
                      <TableCell className="pr-6"><div className="h-8 w-24 bg-slate-200 rounded ml-auto"></div></TableCell>
                    </TableRow>
                  ))
                ) : datasets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20">
                      <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UploadCloud className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No datasets found</h3>
                      <p className="text-slate-500 max-w-sm mx-auto mb-6">Upload your first golden dataset to start running evaluations against your models.</p>
                      <Button className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">
                        Upload CSV / JSON
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  datasets.map((d) => (
                    <TableRow key={d.id} className="hover:bg-slate-50/80 transition-colors">
                      <TableCell className="pl-6 font-bold text-slate-900">{d.name}</TableCell>
                      <TableCell>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-xs rounded-md font-medium">
                          v{d.version}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-slate-600">{d.cases} cases</TableCell>
                      <TableCell className="text-slate-500 font-medium">{new Date(d.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="outline" size="sm" className="rounded-lg font-semibold text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                          View Cases
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <Pagination 
              page={page} 
              pages={pages} 
              total={total} 
              onPageChange={setPage} 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
