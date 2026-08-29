import { FadeInOnScroll } from '../lib/AnimationUtils';
import { CheckCircle2, Building, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-8">
        
        <FadeInOnScroll className="mb-24">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">
            Transparent pricing.<br />
            <span className="text-slate-500">Infinite ROI.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 font-normal leading-relaxed max-w-3xl">
            Choose the plan that fits your pipeline. Predictable costs with unmatched visibility into your LLM performance.
          </p>
        </FadeInOnScroll>

        <div className="grid md:grid-cols-3 gap-px bg-white/20 border border-white/20">
          
          {/* Starter Plan */}
          <FadeInOnScroll className="bg-[#050505] p-12 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Starter</span>
              <div className="mt-4 mb-8">
                <span className="text-4xl font-medium tracking-tight">$499</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Essential observability and testing for small teams scaling their first production LLM application.
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  "10,000 evaluations / month",
                  "Real-time Telemetry",
                  "A/B Prompt Experiments",
                  "Slack Integration",
                  "Community Support"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={() => navigate('/login')} className="w-full h-12 bg-white text-black hover:bg-slate-200 rounded-none font-medium">
              Start Free Trial
            </Button>
          </FadeInOnScroll>

          {/* Professional Plan */}
          <FadeInOnScroll delay={0.1} className="bg-white text-black p-12 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 bg-black text-white text-xs font-mono px-3 py-1 m-4">RECOMMENDED</div>
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Professional</span>
              <div className="mt-4 mb-8">
                <span className="text-4xl font-medium tracking-tight">$1,499</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <p className="text-slate-700 mb-8 leading-relaxed">
                Advanced features and higher limits for fast-growing companies deploying multiple AI agents.
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  "100,000 evaluations / month",
                  "Semantic Caching Engine",
                  "LLM Cost Autopilot",
                  "Failure Forensics Tracing",
                  "Priority Email Support"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span className="text-slate-900 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={() => navigate('/login')} className="w-full h-12 bg-black text-white hover:bg-slate-800 rounded-none font-medium">
              Start Free Trial
            </Button>
          </FadeInOnScroll>

          {/* Enterprise Plan */}
          <FadeInOnScroll delay={0.2} className="bg-[#050505] p-12 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Enterprise</span>
              <div className="mt-4 mb-8">
                <span className="text-4xl font-medium tracking-tight">Custom</span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Dedicated infrastructure and strict governance for massive-scale enterprise deployments.
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  "Unlimited evaluations",
                  "VPC Peering & Single Tenant",
                  "SOC2 Compliance Reports",
                  "Custom RBAC & SSO",
                  "24/7 Dedicated Support"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Building className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={() => navigate('/login')} className="w-full h-12 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-none font-medium">
              Contact Sales
            </Button>
          </FadeInOnScroll>

        </div>

      </div>
    </div>
  );
}
