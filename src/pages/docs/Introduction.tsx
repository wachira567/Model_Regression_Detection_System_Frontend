import { FadeInOnScroll } from '../../lib/AnimationUtils';

export default function Introduction() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
          Getting Started
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Introduction to MRDS
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          The Model Regression Detection System (MRDS) is an open-source, full-stack platform engineered to evaluate and monitor Generative AI models in production.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What is MRDS?</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          Generative AI models are notoriously difficult to test. They are non-deterministic, meaning the exact same prompt can yield different outputs. MRDS brings traditional software engineering rigor to this process by utilizing "Golden Datasets" and LLM-as-a-judge techniques.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          This project serves as a showcase of modern architectural patterns, including asynchronous background processing with FastAPI, complex multi-tenant data modeling with PostgreSQL, and a highly responsive React frontend.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <div className="bg-slate-900 rounded-3xl p-8 mt-12 shadow-xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-4">Quick Start</h3>
          <p className="text-slate-400 mb-6">
            If you want to spin up the entire MRDS stack locally, clone the repository and use Docker Compose:
          </p>
          <div className="bg-black/50 rounded-xl p-4 overflow-x-auto border border-white/10">
            <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
              <code>{`# Clone the backend repository
git clone https://github.com/wachira567/Model_Regression_Detection_System_Backend

# Start the services
docker-compose up -d --build

# Run database migrations
docker-compose exec web alembic upgrade head`}</code>
            </pre>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Core Philosophy</h2>
        <ul className="space-y-4 mt-6">
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">1</div>
            <div>
              <strong className="block text-slate-900 mb-1">Never Trust, Always Verify</strong>
              <p className="text-slate-600">Every prompt variation or model swap should be rigorously evaluated against a baseline before hitting production.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">2</div>
            <div>
              <strong className="block text-slate-900 mb-1">Developer Experience Matters</strong>
              <p className="text-slate-600">Testing infrastructure shouldn't be a chore. MRDS provides clean APIs and automated CI/CD integration.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-bold">3</div>
            <div>
              <strong className="block text-slate-900 mb-1">Scale from Day One</strong>
              <p className="text-slate-600">Built entirely on asynchronous Python (FastAPI) and PostgreSQL to handle thousands of concurrent evaluations.</p>
            </div>
          </li>
        </ul>
      </FadeInOnScroll>
    </div>
  );
}
