import { FadeInOnScroll } from '../lib/AnimationUtils';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        <FadeInOnScroll className="px-8 max-w-5xl mb-32">
          <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">
            We believe AI should<br />
            <span className="text-slate-500">be deterministic.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 font-normal leading-relaxed max-w-3xl">
            Antigravity was built to bridge the gap between generative AI and traditional software engineering rigor. We deliver enterprise-grade observability and CI/CD pipelines to ensure your models perform safely and reliably at scale.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll className="mb-32 px-8">
          <div className="w-full h-px bg-white/20 mb-8" />
          <div className="w-full h-96 relative flex items-center justify-center border border-white/10 bg-[#050505]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10" />
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-grid-of-squares-25254-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute z-20 font-medium text-4xl md:text-6xl text-white tracking-tight">ENGINEERED FOR PRODUCTION</div>
          </div>
        </FadeInOnScroll>

        <div className="max-w-7xl mx-auto px-8">
          <FadeInOnScroll className="mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Core Principles</h2>
            <div className="h-px bg-white/20 w-full mt-8" />
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
            {[
              {
                id: "01",
                title: "Engineering Rigor",
                desc: "We enforce strict testing methodologies. By integrating seamlessly into your CI/CD pipeline, we catch hallucinations and regressions before they reach your customers."
              },
              {
                id: "02",
                title: "Enterprise Scale",
                desc: "Designed to handle high-throughput workloads with advanced patterns like Semantic Caching, dynamic Model Routing, and global edge deployments."
              },
              {
                id: "03",
                title: "Security & Governance",
                desc: "Your data remains yours. With SSO, Role-Based Access Control, and strict human-in-the-loop audit trails, we meet the highest compliance standards."
              },
              {
                id: "04",
                title: "Maximizing ROI",
                desc: "Generative AI is expensive. Our platform automatically optimizes prompt token usage and routes to cost-effective models without sacrificing accuracy."
              }
            ].map((value, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1} className="flex flex-col border-l border-white/20 pl-8">
                <span className="text-xs font-mono text-slate-500 mb-6">{value.id}</span>
                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">{value.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{value.desc}</p>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
