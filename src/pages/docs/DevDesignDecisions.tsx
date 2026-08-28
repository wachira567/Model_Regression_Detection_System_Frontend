import { FadeInOnScroll } from '../../lib/AnimationUtils';
import { Lightbulb, Database, Zap, Cpu } from 'lucide-react';

export default function DevDesignDecisions() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-bold mb-6 border border-rose-100">
          Developer Hub
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Design Decisions
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          A look under the hood at the architectural choices that allow MRDS to process thousands of LLM evaluations securely and asynchronously.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="my-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">Why FastAPI & Background Tasks?</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Evaluating an LLM is inherently an I/O bound process. When a user triggers an evaluation run of 500 dataset items, the system must make 500 external HTTP requests to OpenAI or Anthropic.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 mt-0 mb-2">The Solution</h4>
            <p className="text-sm text-slate-600 mb-0">
              We chose <strong>FastAPI</strong> because of its native support for asynchronous programming (<code>asyncio</code>). Instead of blocking the main thread, the API immediately returns a <code>202 Accepted</code>. The heavy lifting is handed off to FastAPI's <code>BackgroundTasks</code>. This allows the API to remain highly responsive, capable of handling thousands of concurrent connections while the evaluations run concurrently in the background.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <div className="my-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">Semantic Caching with pgvector</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Traditional caching (Redis exact-match) fails in generative AI because users rarely ask questions the exact same way twice ("How do I reset my password?" vs "I need to change my password").
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 mt-0 mb-2">The Solution</h4>
            <p className="text-sm text-slate-600 mb-0">
              We implemented <strong>Semantic Caching</strong> using the <code>pgvector</code> extension in PostgreSQL. Incoming prompts are converted to embeddings. We query the database using Cosine Similarity (<code>&lt;=&gt;</code> operator). If the similarity distance is below a strict threshold, we serve the cached response, drastically reducing token costs and latency without sacrificing answer quality.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="my-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">Strict Multi-Tenant Isolation</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Data leakage is the cardinal sin of B2B SaaS. Ensuring that Organization A cannot access Organization B's proprietary datasets was our top priority.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 mt-0 mb-2">The Solution</h4>
            <p className="text-sm text-slate-600 mb-0">
              We enforce multi-tenancy at the ORM level. Every model in the SQLAlchemy schema (Projects, Datasets, EvalRuns) inherits from a custom Base that enforces an <code>organization_id</code> foreign key constraint. All repository queries require the active organization context to be passed from the decoded JWT token, making cross-tenant queries physically impossible in the ORM layer.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.4}>
        <div className="bg-slate-900 rounded-3xl p-8 mt-12 border border-slate-800 text-center">
          <Lightbulb className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Want to see the code?</h3>
          <p className="text-slate-400 mb-0">
            This project is open-source. Dive into the backend repository to see these patterns implemented in production.
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
