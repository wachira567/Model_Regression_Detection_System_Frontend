import { FadeInOnScroll } from '../lib/AnimationUtils';
import { CheckCircle2, Heart, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        <FadeInOnScroll className="text-center max-w-3xl mx-auto mb-20 mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 text-slate-700 text-sm font-bold mb-8 border border-slate-900/10">
            <Heart className="w-4 h-4 text-rose-500" /> Open Source & Free
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Open Access.
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
            MRDS is built as a portfolio project to showcase modern AI engineering. It is completely free to use. Explore the architecture, run evaluations, or check out the code.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] p-10 md:p-16 border border-slate-200 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-10"></div>
            
            <div className="flex flex-col md:flex-row gap-12 relative z-10">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Everything is included.</h2>
                <ul className="space-y-4">
                  {[
                    "Golden Dataset Bootstrapping",
                    "A/B Prompt Experiments",
                    "Semantic Caching",
                    "LLM Cost Autopilot",
                    "AI Feature Flags",
                    "Failure Forensics Tracing",
                    "Enterprise Multi-Tenancy & RBAC",
                    "Full CI/CD Integration via API"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      <span className="text-lg text-slate-700 font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex-1 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Explore the platform</h3>
                <p className="text-slate-500 mb-8">Dive into the live environment and see how it works under the hood.</p>
                <Button onClick={() => navigate('/login')} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-slate-900/30 transition-all">
                  Try Live Demo
                </Button>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll className="mt-32 max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Feedback & Collaboration</h2>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Since this is a showcase project, I'd love to hear your thoughts on the architecture, UI design, or codebase. Feel free to reach out with suggestions or feedback.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-left">
            <h4 className="font-bold text-slate-900 mb-4">Send us your thoughts</h4>
            <textarea 
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
              placeholder="I love the product, but it would be great if..."
            ></textarea>
            <Button className="w-full sm:w-auto px-8 h-12 bg-slate-900 text-white rounded-xl font-semibold">
              Submit Feedback
            </Button>
          </div>
        </FadeInOnScroll>

      </div>
    </div>
  );
}
