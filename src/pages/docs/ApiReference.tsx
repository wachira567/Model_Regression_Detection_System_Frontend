import { FadeInOnScroll } from '../../lib/AnimationUtils';

export default function ApiReference() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
          Developers
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          API Reference
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          Programmatically interact with the MRDS backend to trigger evaluations from your CI/CD pipelines.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Authentication</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          All API endpoints (except public auth endpoints) require a JSON Web Token (JWT) provided in the `Authorization` header.
        </p>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
            <code>Authorization: Bearer &lt;your_jwt_token&gt;</code>
          </pre>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Trigger an Evaluation Run</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          <code className="text-sm bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono font-bold border border-slate-200 mr-2">POST</code>
          <code className="text-sm text-indigo-600 font-mono">/api/v1/eval-runs</code>
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          Triggers an asynchronous background evaluation of a specific prompt configuration against a dataset.
        </p>
        
        <h4 className="font-bold text-slate-900 mb-2">Request Body (JSON)</h4>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto mb-6">
          <pre className="text-sky-400 font-mono text-sm leading-relaxed">
            <code>{`{
  "project_id": "uuid-string",
  "dataset_id": "uuid-string",
  "prompt_config_id": "uuid-string"
}`}</code>
          </pre>
        </div>

        <h4 className="font-bold text-slate-900 mb-2">Example cURL</h4>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto mb-6">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
            <code>{`curl -X POST https://api.mrds.example.com/api/v1/eval-runs \\
  -H "Authorization: Bearer $MRDS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "550e8400-e29b-41d4-a716-446655440000",
    "dataset_id": "550e8400-e29b-41d4-a716-446655440001",
    "prompt_config_id": "550e8400-e29b-41d4-a716-446655440002"
  }'`}</code>
          </pre>
        </div>

        <h4 className="font-bold text-slate-900 mb-2">Response <span className="text-emerald-600 ml-2 font-mono text-sm">202 Accepted</span></h4>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-indigo-400 font-mono text-sm leading-relaxed">
            <code>{`{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "status": "pending",
  "message": "Evaluation run triggered in background"
}`}</code>
          </pre>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mt-12">
          <h3 className="text-lg font-bold text-indigo-900 mb-2">Polling for Results</h3>
          <p className="text-indigo-700 text-sm mb-0">
            Because evaluations process asynchronously, you should poll the <code>GET /api/v1/eval-runs/&#123;id&#125;</code> endpoint to check if the status has changed from <code>pending</code> to <code>completed</code> or <code>failed</code>.
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
