import { FadeInOnScroll } from '../../lib/AnimationUtils';
import { Webhook } from 'lucide-react';

export default function DevApiReference() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-bold mb-6 border border-rose-100">
          Developer Hub
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          API Reference
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          Programmatically integrate MRDS into your CI/CD pipelines to automatically block bad deployments.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Authentication</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          All API endpoints require a JSON Web Token (JWT) provided in the <code>Authorization</code> header. You can generate a long-lived Service Token in the Admin Dashboard.
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
          Triggers an asynchronous background evaluation.
        </p>
        
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto mb-6">
          <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
            <code>{`curl -X POST https://api.mrds.example.com/api/v1/eval-runs \\
  -H "Authorization: Bearer $MRDS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "550e8400-e29b-41d4-a716-446655440000",
    "dataset_id": "550e8400-e29b-41d4-a716-446655440001",
    "prompt_config_id": "550e8400-e29b-41d4-a716-446655440002",
    "webhook_url": "https://your-ci-server.com/mrds-callback"
  }'`}</code>
          </pre>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 mt-12">
          <h3 className="text-xl font-bold text-rose-900 mb-4 flex items-center gap-2">
            <Webhook className="w-6 h-6" /> Webhooks vs Polling
          </h3>
          <p className="text-rose-800 mb-4">
            Notice the <code>webhook_url</code> parameter in the payload above? Because evaluations are I/O bound and can take minutes to complete, you should <strong>never</strong> hold open an HTTP connection waiting for the result.
          </p>
          <p className="text-rose-800 mb-0">
            Provide a Webhook URL, and MRDS will POST the final payload (including the pass/fail status and overall score) back to your CI server the moment the background worker finishes the job. This is how we ensure 100% reliability in our CI/CD pipelines without hitting timeout limits.
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
