import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileTerminal, Plus } from "lucide-react";
import api from "@/lib/api";

interface PromptConfig {
  id: string;
  feature_id: string;
  version: str;
  model: str;
  is_active: boolean;
  created_at: string;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptConfig[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from /api/v1/prompts
    // For now we mock it to show the UI
    setPrompts([
      { id: "1", feature_id: "email_classifier", version: "1.0.0", model: "gpt-4o-mini", is_active: true, created_at: "2026-08-01T12:00:00Z" },
      { id: "2", feature_id: "email_classifier", version: "0.9.0", model: "gpt-3.5-turbo", is_active: false, created_at: "2026-07-15T10:00:00Z" }
    ]);
  }, []);

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
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileTerminal className="h-5 w-5 text-blue-600" />
            Active Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
