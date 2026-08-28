import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Database, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { FadeInOnScroll, CountUp } from '../lib/AnimationUtils';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 min-h-[90vh]">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-500/10 to-emerald-500/10 rounded-full blur-[120px] -z-10 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-5xl mx-auto z-10 w-full">
          <FadeInOnScroll delay={0.1} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-medium mb-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            MRDS 2.0 is now live in open beta
          </FadeInOnScroll>
          
          <FadeInOnScroll delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 leading-[1.05] mb-8">
              Silence the Noise.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-500">See the Regressions.</span>
            </h1>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <p className="text-xl md:text-2xl text-slate-500 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
              You train models. They regress. We catch them before your users do. The ultimate evaluation safety net for generative AI.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.6} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <Button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto h-14 px-10 bg-slate-900 text-white hover:bg-indigo-600 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-1 text-lg group"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              onClick={() => navigate('/how-it-works')}
              variant="outline"
              className="w-full sm:w-auto h-14 px-10 rounded-full font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 text-lg transition-all hover:-translate-y-1"
            >
              See how it works
            </Button>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.8} className="mt-16 text-slate-400 text-sm font-medium">
            <p className="mb-4">No credit card required. Free during beta.</p>
            <div className="flex flex-wrap justify-center gap-4 opacity-70">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Unlimited Models</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> CI/CD Ready</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Team Access</span>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 border-y border-slate-100 bg-slate-50 overflow-hidden">
        <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by forward-thinking engineering teams</p>
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 px-8">
            {['Acme Corp', 'Globex', 'Soylent Corp', 'Initech', 'Umbrella Corp', 'Stark Industries', 'Wayne Enterprises'].map((company, i) => (
              <span key={i} className="text-2xl font-bold text-slate-300">{company}</span>
            ))}
          </div>
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 px-8 absolute top-0">
            {['Acme Corp', 'Globex', 'Soylent Corp', 'Initech', 'Umbrella Corp', 'Stark Industries', 'Wayne Enterprises'].map((company, i) => (
              <span key={`dup-${i}`} className="text-2xl font-bold text-slate-300">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-32">
          <FadeInOnScroll>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-300 tracking-tight">You push a new model.</h2>
          </FadeInOnScroll>
          
          <FadeInOnScroll>
            <h2 className="text-5xl md:text-7xl font-bold text-rose-500 tracking-tight">Performance drops 12% overnight.</h2>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-400 tracking-tight">Your users notice before you do.</h2>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 tracking-tight">
              Not anymore.
            </h2>
            <p className="mt-8 text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              MRDS integrates directly into your deployment pipeline, comparing every new model iteration against your golden datasets before it ever reaches production.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-slate-50 border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Everything you need for safe AI.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              A complete toolkit designed to catch regressions, track drift, and enforce quality at scale.
            </p>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="h-6 w-6 text-indigo-500" />,
                title: "Golden Datasets",
                desc: "Automatically bootstrap test datasets from production logs to curate perfect test cases."
              },
              {
                icon: <Zap className="h-6 w-6 text-amber-500" />,
                title: "Semantic Caching",
                desc: "Instantly serve responses for semantically similar queries to drastically cut latency and LLM costs."
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
                title: "Cost Autopilot",
                desc: "Intelligently route easy queries to cheaper models (like GPT-3.5) and hard ones to GPT-4."
              },
              {
                icon: <Database className="h-6 w-6 text-blue-500" />,
                title: "A/B Prompt Testing",
                desc: "Safely run multiple prompt variants in production and measure their performance in real-time."
              },
              {
                icon: <Zap className="h-6 w-6 text-purple-500" />,
                title: "AI Feature Flags",
                desc: "Control prompt rollouts with precision. Ramp up traffic from 0 to 100% or use the kill switch."
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-rose-500" />,
                title: "Failure Forensics",
                desc: "Visual trace explorer that breaks down every pipeline step to show exactly why a model failed."
              }
            ].map((feature, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button onClick={() => navigate('/features')} variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold text-lg">
              Explore all features <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center relative z-10">
          <FadeInOnScroll delay={0.1}>
            <div className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-4 tracking-tighter">
              <CountUp end={99} suffix=".9%" />
            </div>
            <p className="text-xl text-slate-400 font-medium">Uptime Guarantee</p>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.2}>
            <div className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-4 tracking-tighter">
              <CountUp end={50} suffix="+" />
            </div>
            <p className="text-xl text-slate-400 font-medium">Engineering Teams</p>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.3}>
            <div className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-4 tracking-tighter">
              <CountUp end={1} suffix="M+" />
            </div>
            <p className="text-xl text-slate-400 font-medium">Evaluations Run</p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white px-6">
        <FadeInOnScroll className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Ready to deploy with confidence?
          </h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
            Join the forward-thinking engineering teams trusting MRDS to protect their generative AI models in production.
          </p>
          <Button 
            onClick={() => navigate('/login')}
            className="h-16 px-12 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full font-bold transition-all shadow-xl hover:shadow-indigo-600/30 text-xl group hover:-translate-y-1"
          >
            Start your free account
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="mt-6 text-slate-400 font-medium text-sm">Open source. Free during beta. No credit card required.</p>
        </FadeInOnScroll>
      </section>
    </>
  );
}
