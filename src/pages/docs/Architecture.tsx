import { FadeInOnScroll } from '../../lib/AnimationUtils';
import { Database, Server, Layout, ArrowRight } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
          Technical Deep Dive
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          System Architecture
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          MRDS is built on a modern, decoupled architecture designed for high throughput and rapid iteration.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Layout className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Frontend</h3>
            <p className="text-sm text-slate-600">React 19 with Vite. Styled using Tailwind CSS and Framer Motion for smooth interactions.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative md:-translate-y-4">
            <Server className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Backend API</h3>
            <p className="text-sm text-slate-600">FastAPI (Python) providing highly concurrent REST endpoints and background task processing.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Database className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Database</h3>
            <p className="text-sm text-slate-600">PostgreSQL for relational multi-tenant storage, accessed asynchronously via SQLAlchemy.</p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Data Model Overview</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          The system employs a rigorous multi-tenant data model. All core entities (`Projects`, `Experiments`, `EvalRuns`) are strictly scoped to an `Organization`.
        </p>
        
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-8">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            Hierarchy <ArrowRight className="w-4 h-4 text-slate-400" />
          </h4>
          <ul className="space-y-2 text-slate-600">
            <li><strong>Organization:</strong> The top-level tenant. Contains multiple Projects and Users.</li>
            <li><strong>Project:</strong> A logical grouping (e.g., "Customer Support Chatbot").</li>
            <li><strong>Golden Dataset:</strong> A collection of baseline inputs/outputs scoped to a Project.</li>
            <li><strong>Eval Run:</strong> An execution of a specific Prompt Configuration against a Golden Dataset.</li>
          </ul>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Background Processing</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Evaluating hundreds of LLM outputs is a highly I/O bound task that cannot block the main API thread. MRDS utilizes FastAPI's `BackgroundTasks` to offload the heavy lifting.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          When an evaluation is triggered, the API immediately returns a `202 Accepted` response with an `EvalRun` ID. The client can then poll or subscribe to WebSockets (roadmap) to monitor the progress of the worker grading the outputs.
        </p>
      </FadeInOnScroll>
    </div>
  );
}
