import { FadeInOnScroll } from '../lib/AnimationUtils';
import { Database, Play, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HowItWorksPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Database className="w-6 h-6 text-white" strokeWidth={1.5} />,
      title: "01 / Ingestion Pipeline",
      description: "Securely ingest ground truth data directly from your production logs or cloud buckets. Our enterprise data connectors automatically bootstrap Golden Datasets for granular analytics.",
      code: `// Enterprise payload structure
[
  {
    "trace_id": "req_8f73b...",
    "prompt": "Summarize this email...",
    "expected_output": "The client wants a meeting...",
    "category": "summarization"
  }
]`
    },
    {
      icon: <Play className="w-6 h-6 text-white" strokeWidth={1.5} />,
      title: "02 / Automated CI/CD Hooks",
      description: "Trigger evaluation runs programmatically from GitHub Actions, GitLab CI, or Jenkins. Our high-throughput async engine handles massive concurrent LLM invocations across multiple providers.",
      code: `$ curl -X POST https://api.antigravity.systems/v1/evals \\
  -H "Authorization: Bearer $AG_API_KEY" \\
  -d '{"dataset_id": "ds_prod_123", "target_model": "gpt-4o"}'`
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-white" strokeWidth={1.5} />,
      title: "03 / Semantic Auditing & Blocking",
      description: "Antigravity grades outputs using deterministic metrics and LLM-as-a-judge heuristics. If a hallucination or performance regression is detected, the deployment is automatically blocked.",
      code: `Evaluation Completed.
Score: 82% (Critical Threshold: 90%)
Result: FAILED. 
Action: Deployment blocked. Drift detected in 'summarization'.`
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-8">
        
        <FadeInOnScroll className="mb-32">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">
            The deployment<br />
            <span className="text-slate-500">workflow.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 font-normal leading-relaxed max-w-3xl">
            A transparent look at how Antigravity integrates directly into your existing CI/CD pipelines to protect your production environment.
          </p>
        </FadeInOnScroll>

        <div className="max-w-5xl">
          {steps.map((step, i) => (
            <FadeInOnScroll key={i} delay={0.1} className="relative mb-24 last:mb-0">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
                
                {/* Step Title & Icon */}
                <div className="md:col-span-5 flex flex-col pt-2 border-t border-white/20">
                  <div className="flex items-center gap-4 mb-6 mt-4">
                    {step.icon}
                    <h2 className="text-2xl font-medium tracking-tight text-white">{step.title}</h2>
                  </div>
                  <p className="text-lg text-slate-400 leading-relaxed pr-8">
                    {step.description}
                  </p>
                </div>
                
                {/* Code Block */}
                <div className="md:col-span-7 bg-[#050505] p-8 border border-white/10 w-full overflow-x-auto">
                  <pre className="text-sm font-mono text-slate-300 leading-loose">
                    <code>{step.code}</code>
                  </pre>
                </div>

              </div>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll className="mt-32 border-t border-white/20 pt-24 text-center">
          <Button onClick={() => navigate('/login')} className="h-14 px-12 bg-white text-black hover:bg-slate-200 rounded-none font-medium text-lg group">
            Integrate Now
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </FadeInOnScroll>

      </div>
    </div>
  );
}
