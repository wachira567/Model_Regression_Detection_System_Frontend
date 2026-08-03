import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileTerminal } from "lucide-react";

export default function PromptsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prompts</h1>
        <p className="text-slate-500 mt-2">Manage your prompt configurations and see their versions.</p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileTerminal className="h-5 w-5 text-blue-600" />
            Prompt Configurations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center text-slate-500">
            Prompt management UI coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
