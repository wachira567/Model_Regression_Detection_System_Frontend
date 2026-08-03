import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Plus } from "lucide-react";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<any[]>([]);

  useEffect(() => {
    setDatasets([
      { id: "ds_1", name: "email_classifier_golden", version: "1.0.0", cases: 100, created_at: "2026-08-01T12:00:00Z" }
    ]);
  }, []);

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
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-600" />
            Available Datasets
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
