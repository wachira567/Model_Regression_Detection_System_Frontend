import { ShieldCheck, Zap, Database, GitBranch, Target, Cpu } from 'lucide-react';
import { FadeInOnScroll } from '../lib/AnimationUtils';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Database className="w-8 h-8 text-indigo-500" />,
      title: "Golden Datasets",
      description: "Automatically bootstrap test datasets from production logs to curate perfect test cases. MRDS securely stores these ground truths.",
      color: "bg-indigo-50",
      border: "border-indigo-100"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "A/B Prompt Testing",
      description: "Safely run multiple prompt variants in production and measure their performance in real-time. Know exactly which prompt converts better.",
      color: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "Semantic Caching",
      description: "Instantly serve responses for semantically similar queries. Cut down your LLM API costs by up to 80% while delivering zero-latency experiences.",
      color: "bg-amber-50",
      border: "border-amber-100"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: "LLM Cost Autopilot",
      description: "Intelligently route easy queries to cheaper models (like GPT-3.5) and hard queries to GPT-4 based on historical difficulty scoring.",
      color: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      icon: <GitBranch className="w-8 h-8 text-purple-500" />,
      title: "AI Feature Flags",
      description: "Control your AI prompt rollouts with surgical precision. Ramp up traffic from 0 to 100% safely, or use an instant kill switch.",
      color: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      icon: <Cpu className="w-8 h-8 text-rose-500" />,
      title: "Failure Forensics",
      description: "Visual trace explorer that breaks down every pipeline step (Retrieval, Generation, Judge) to show exactly why a model failed in production.",
      color: "bg-rose-50",
      border: "border-rose-100"
    }
  ];

  return (
    <div className="pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <FadeInOnScroll className="text-center max-w-3xl mx-auto mb-32 mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Powerful features.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Beautifully simple.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
            MRDS provides a comprehensive suite of tools designed to ensure your generative AI applications never degrade in production.
          </p>
        </FadeInOnScroll>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FadeInOnScroll key={i} delay={i * 0.1}>
              <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full cursor-default">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} ${feature.border} border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>

        {/* Architecture Section */}
        <FadeInOnScroll className="mt-40 bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[150px] opacity-30 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 tracking-tight">Built on modern architecture</h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-xl mb-16 relative z-10 font-medium leading-relaxed">
            Powered by FastAPI, PostgreSQL, and React. Engineered for lightning-fast evaluations and massive scalability from day one.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {['FastAPI Backend', 'Async PostgreSQL', 'Vite & React 19', 'Framer Motion'].map((tech, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl font-semibold text-slate-300 hover:bg-slate-700/50 transition-colors text-lg">
                {tech}
              </div>
            ))}
          </div>
        </FadeInOnScroll>

        {/* CTA */}
        <FadeInOnScroll className="mt-32 text-center bg-indigo-50 rounded-[3rem] p-12 md:p-24 border border-indigo-100">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to see it in action?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Start evaluating your models with MRDS today. It's completely free during our open beta.</p>
          <Button onClick={() => navigate('/login')} className="h-16 px-12 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full font-bold text-xl shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all">
            Get Started Free
          </Button>
        </FadeInOnScroll>

      </div>
    </div>
  );
}
