import { FadeInOnScroll } from '../../lib/AnimationUtils';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export default function Features() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
          Core Capabilities
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Platform Features
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          A deep dive into the engineering implementations that power the evaluation and observability engines.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">A/B Prompt Testing</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Safely test new prompt architectures in production using the Variant Routing engine. The platform allows you to allocate traffic percentages (e.g., 90% Control, 10% Variant) across your models.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 mb-2 mt-0">Implementation Details</h4>
            <p className="text-sm text-slate-600 mb-0">
              Variant assignment is deterministic based on a hash of the User ID. This ensures a consistent experience for individual users while maintaining precise statistical distribution across the traffic pool.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">Semantic Caching</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Reduce LLM costs and latency by caching semantically similar requests. Unlike exact-match caching, semantic caching uses embeddings to understand intent.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 mb-2 mt-0">Implementation Details</h4>
            <p className="text-sm text-slate-600 mb-0">
              When a request comes in, the backend generates an embedding vector. It then queries the pgvector extension in PostgreSQL using cosine similarity. If a match is found above the configured threshold (e.g., 0.95), the cached response is served instantly.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">LLM Cost Autopilot</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Automatically route simple queries to cheaper, faster models (like GPT-3.5) and reserve expensive reasoning models (like GPT-4) for complex tasks.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 mb-2 mt-0">Implementation Details</h4>
            <p className="text-sm text-slate-600 mb-0">
              The routing decision is powered by a lightweight classifier model that analyzes the prompt's structural complexity and historical difficulty scores before hitting the external LLM provider.
            </p>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
