import { FadeInOnScroll } from '../lib/AnimationUtils';
import { Heart, Globe, Shield, Code2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        <FadeInOnScroll className="text-center max-w-4xl mx-auto mb-32 mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            We believe AI should<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">never silently fail.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
            As AI models become more complex and unpredictable, engineering teams need deterministic ways to evaluate them. We built MRDS to bring traditional software testing rigor to generative AI.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll className="mb-32">
          <div className="w-full h-96 bg-slate-900 rounded-[3rem] overflow-hidden relative flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 mix-blend-overlay"></div>
            {/* Abstract visual */}
            <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-slate-900 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute font-bold text-4xl text-white tracking-widest uppercase">The MRDS Team</div>
          </div>
        </FadeInOnScroll>

        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-500">The core principles that guide how we build MRDS.</p>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Shield className="w-6 h-6 text-emerald-500" />,
                title: "Reliability First",
                desc: "A testing tool must be the most reliable piece of your stack. We engineer for 99.99% uptime and zero false positives."
              },
              {
                icon: <Globe className="w-6 h-6 text-blue-500" />,
                title: "Built for Enterprise",
                desc: "We understand that security, RBAC, and data isolation aren't nice-to-haves—they are Day 1 requirements."
              },
              {
                icon: <Heart className="w-6 h-6 text-rose-500" />,
                title: "Community Driven",
                desc: "We listen to our users. Our roadmap is heavily influenced by the engineering teams trusting us in production."
              },
              {
                icon: <Code2 className="w-6 h-6 text-indigo-500" />,
                title: "Developer Experience",
                desc: "If a tool is hard to integrate, it won't be used. We prioritize clean APIs, simple SDKs, and beautiful dashboards."
              }
            ].map((value, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-500">{value.desc}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
