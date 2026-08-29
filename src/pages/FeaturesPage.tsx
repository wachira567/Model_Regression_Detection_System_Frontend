import { ShieldCheck, Zap, Database, GitBranch, Target, Cpu } from 'lucide-react';
import { FadeInOnScroll } from '../lib/AnimationUtils';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    {
      id: "F.01",
      icon: <Database className="w-6 h-6 text-slate-400" strokeWidth={1.5} />,
      title: "Automated Golden Datasets",
      description: "Automatically bootstrap test datasets from production logs. Curate ground-truth data continuously without manual engineering overhead."
    },
    {
      id: "F.02",
      icon: <Target className="w-6 h-6 text-slate-400" strokeWidth={1.5} />,
      title: "A/B Prompt Testing",
      description: "Safely measure prompt performance across different LLM configurations. Deploy variants to fractional traffic and measure statistical impact."
    },
    {
      id: "F.03",
      icon: <Zap className="w-6 h-6 text-slate-400" strokeWidth={1.5} />,
      title: "Semantic Caching",
      description: "Slash LLM API costs by up to 40% with vector-based semantic caching, while dramatically reducing latency for end users."
    },
    {
      id: "F.04",
      icon: <ShieldCheck className="w-6 h-6 text-slate-400" strokeWidth={1.5} />,
      title: "Cost Autopilot",
      description: "Dynamic routing heuristics intelligently send simpler queries to faster, cheaper models, reserving complex reasoning models for edge cases."
    },
    {
      id: "F.05",
      icon: <GitBranch className="w-6 h-6 text-slate-400" strokeWidth={1.5} />,
      title: "AI Feature Flags",
      description: "Surgical rollout systems with instance-level control. Gradually expose new models or prompts with instant kill-switches."
    },
    {
      id: "F.06",
      icon: <Cpu className="w-6 h-6 text-slate-400" strokeWidth={1.5} />,
      title: "Failure Forensics",
      description: "Visual trace explorer parses and presents complex execution graphs. Pinpoint the exact node and token where an evaluation failed."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <FadeInOnScroll className="mb-24">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">
            Engineered to scale.<br />
            <span className="text-slate-500">Built for enterprise.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 font-normal leading-relaxed max-w-3xl">
            A comprehensive suite of observability and CI/CD tools designed to protect revenue, reduce API costs, and guarantee LLM reliability in production.
          </p>
        </FadeInOnScroll>

        {/* Features Structural Layout */}
        <div className="border-t border-white/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FadeInOnScroll key={i} delay={i * 0.05} className="border-b border-r border-white/10 p-8 md:p-12 flex flex-col justify-between min-h-[350px] hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-slate-500">{feature.id}</span>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

        {/* Architecture Section */}
        <FadeInOnScroll className="mt-32 border border-white/10 p-12 md:p-24 text-center bg-[#050505]">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">Uncompromising Architecture</h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl mb-16 leading-relaxed">
            Powered by high-throughput async data pipelines and multi-tenant security layers. We integrate seamlessly with your existing VPCs and identity providers.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {['SOC2 Compliant Design', 'RBAC & SSO', 'VPC Peering', 'Zero Data Retention'].map((tech, i) => (
              <div key={i} className="bg-[#050505] p-6 text-sm font-mono text-slate-300">
                {tech}
              </div>
            ))}
          </div>
        </FadeInOnScroll>

        {/* CTA */}
        <FadeInOnScroll className="mt-32 p-12 md:p-24 border border-white/10 bg-white text-black text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">Deploy with confidence.</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Protect your brand and bottom line. Start evaluating your models with Antigravity today.
          </p>
          <Button onClick={() => navigate('/login')} className="h-14 px-12 bg-black text-white hover:bg-slate-800 rounded-none font-medium text-lg">
            Request Enterprise Demo
          </Button>
        </FadeInOnScroll>

      </div>
    </div>
  );
}
