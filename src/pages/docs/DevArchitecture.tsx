import { FadeInOnScroll } from '../../lib/AnimationUtils';
import { Database, Server, Layout, ArrowRight } from 'lucide-react';

export default function DevArchitecture() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-bold mb-6 border border-rose-100">
          Developer Hub
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          System Architecture
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          A high-level overview of the MRDS stack, decoupling the data layer from the evaluation engine.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Layout className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Frontend</h3>
            <p className="text-sm text-slate-600">React 19 with Vite. Styled using Tailwind CSS and Framer Motion for smooth, hardware-accelerated interactions. Deployed statically.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative md:-translate-y-4">
            <Server className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">API Engine</h3>
            <p className="text-sm text-slate-600">FastAPI (Python 3.11+) providing highly concurrent REST endpoints, JWT-based auth, and background task processing.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Database className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Persistence</h3>
            <p className="text-sm text-slate-600">PostgreSQL (with pgvector) for relational multi-tenant storage, accessed asynchronously via SQLAlchemy 2.0.</p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Evaluation Pipeline</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          The core of MRDS is its asynchronous evaluation pipeline. Here is the lifecycle of a single EvalRun:
        </p>
        
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 my-8">
          <ol className="space-y-6 text-slate-400 text-sm list-decimal pl-4">
            <li>
              <strong className="text-white">Trigger:</strong> The client POSTs to <code>/api/v1/eval-runs</code>.
            </li>
            <li>
              <strong className="text-white">Acknowledge:</strong> The API validates the JWT, verifies the user has access to the Project, creates an <code>EvalRun</code> record with status <code>pending</code>, and returns a <code>202 Accepted</code> instantly.
            </li>
            <li>
              <strong className="text-white">Dispatch:</strong> FastAPI's <code>BackgroundTasks</code> picks up the job. It fetches the Golden Dataset from Postgres.
            </li>
            <li>
              <strong className="text-white">Execute:</strong> For every row in the dataset, it formats the <code>PromptConfig</code> and dispatches concurrent HTTP calls to the target LLM.
            </li>
            <li>
              <strong className="text-white">Grade:</strong> The responses are fed into an "LLM-as-a-judge" model which assigns a score based on semantic similarity to the expected output.
            </li>
            <li>
              <strong className="text-white">Finalize:</strong> The traces are saved to the database, and the <code>EvalRun</code> status is updated to <code>completed</code>.
            </li>
          </ol>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
