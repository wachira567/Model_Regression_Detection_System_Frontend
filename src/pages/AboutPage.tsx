import { FadeInOnScroll } from '../lib/AnimationUtils';
import { Heart, Globe, Shield, Code2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        <FadeInOnScroll className="text-center max-w-4xl mx-auto mb-32 mt-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            We believe AI should<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">be deterministic.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
            This project was built to explore the intersection of full-stack engineering and AI observability. It aims to bring traditional software testing rigor to generative AI through a modern, scalable architecture.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll className="mb-32">
          <div className="w-full h-96 bg-slate-900 rounded-[3rem] overflow-hidden relative flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-slate-900/20 mix-blend-overlay"></div>
            {/* Abstract visual */}
            <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-900 to-slate-900 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute font-black text-4xl md:text-6xl text-white tracking-widest uppercase">Built from Scratch</div>
          </div>
        </FadeInOnScroll>

        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll className="mb-16 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Design Principles</h2>
            <p className="text-lg text-slate-500">The core technical pillars behind this portfolio project.</p>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Shield className="w-6 h-6 text-emerald-500" />,
                title: "Engineering Rigor",
                desc: "Built to demonstrate complex state management, data integrity, and high-performance background processing with FastAPI and PostgreSQL."
              },
              {
                icon: <Globe className="w-6 h-6 text-blue-500" />,
                title: "Scalable Architecture",
                desc: "Implementing advanced patterns like Semantic Caching and dynamic Model Routing to showcase deep architectural understanding."
              },
              {
                icon: <Heart className="w-6 h-6 text-rose-500" />,
                title: "Open Source",
                desc: "This entire project is open-source. It serves as a transparent portfolio piece for anyone to explore, critique, and learn from."
              },
              {
                icon: <Code2 className="w-6 h-6 text-indigo-500" />,
                title: "Modern UX/UI",
                desc: "Prioritizing clean, dynamic interfaces using React, Tailwind CSS, and Framer Motion to create a premium, intuitive experience."
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
