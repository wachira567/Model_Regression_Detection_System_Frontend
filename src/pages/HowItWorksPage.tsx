import { FadeInOnScroll } from '../lib/AnimationUtils';
import { Database, Play, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HowItWorksPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Database className="w-8 h-8 text-white" />,
      color: "bg-indigo-500",
      title: "1. Define your Golden Datasets",
      description: "Upload CSVs or use our API to define the absolute ground truth for your prompts. A Golden Dataset contains the prompt, the expected output, and optionally, a category for granular analytics.",
      code: `// Example Dataset format
[
  {
    "prompt": "Summarize this email...",
    "expected_output": "The client wants a meeting...",
    "category": "summarization"
  }
]`
    },
    {
      icon: <Play className="w-8 h-8 text-white" />,
      color: "bg-amber-500",
      title: "2. Trigger evaluations on deploy",
      description: "Whenever you update your model prompt or backend logic, trigger an evaluation run. MRDS will automatically run your entire Golden Dataset through your new model and compare the results.",
      code: `$ curl -X POST https://api.mrds.dev/v1/eval-runs \\
  -H "Authorization: Bearer $MRDS_API_KEY" \\
  -d '{"dataset_id": "ds_123", "model": "gpt-4"}'`
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-white" />,
      color: "bg-emerald-500",
      title: "3. Catch regressions instantly",
      description: "MRDS uses advanced similarity scoring and LLM-as-a-judge to grade the new outputs. If the overall score drops below your configured threshold, your CI/CD pipeline fails, preventing the regression from reaching production.",
      code: `Run completed.
Score: 82% (Threshold: 90%)
Result: FAILED. 
Drift detected in category: 'summarization'`
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        <FadeInOnScroll className="text-center max-w-3xl mx-auto mb-32 mt-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Three steps to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">unbreakable AI.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
            Integrating MRDS into your workflow takes less than 10 minutes. Here's how it protects your production environment.
          </p>
        </FadeInOnScroll>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-12 top-10 bottom-10 w-1 bg-slate-100 rounded-full hidden md:block"></div>

          {steps.map((step, i) => (
            <FadeInOnScroll key={i} delay={0.2} className="relative mb-24 last:mb-0">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="md:w-24 shrink-0 flex justify-center z-10 hidden md:flex">
                  <div className={`w-16 h-16 rounded-full ${step.color} shadow-lg flex items-center justify-center border-4 border-white`}>
                    {step.icon}
                  </div>
                </div>
                
                <div className="flex-1 bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                  <div className="md:hidden flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full ${step.color} shadow-lg flex items-center justify-center`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{step.title}</h2>
                  <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
                    <pre className="text-sm font-mono text-emerald-400">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll className="mt-40 text-center">
          <Button onClick={() => navigate('/login')} className="h-16 px-12 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-bold text-xl shadow-xl hover:-translate-y-1 transition-all group">
            Start integrating now
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Button>
        </FadeInOnScroll>

      </div>
    </div>
  );
}
