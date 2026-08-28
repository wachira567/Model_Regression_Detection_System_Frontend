import { FadeInOnScroll } from '../../lib/AnimationUtils';
import { PlayCircle, Search, BarChart3 } from 'lucide-react';

export default function UserEvaluations() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
          User Guide
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Running Evaluations
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          Once you have a Dataset and a Prompt Configuration, you are ready to put your AI to the test. Here is how to run evaluations and interpret the results.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Starting a Run</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <PlayCircle className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">1. Click Run Evaluation</h3>
            <p className="text-sm text-slate-600 mb-0">Navigate to the "Eval Runs" page and click the primary "Run Evaluation" button in the top right corner.</p>
          </div>
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <Search className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">2. Select Configurations</h3>
            <p className="text-sm text-slate-600 mb-0">Choose which Dataset you want to test against, and which Prompt Configuration you want to evaluate.</p>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed mb-6">
          Once triggered, the evaluation runs in the background. If your dataset has hundreds of questions, this might take a few minutes as MRDS asks the AI every single question and grades the response.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Interpreting the Dashboard</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          When the run is complete, you will see a detailed dashboard. Here is how to read it:
        </p>
        <ul className="space-y-6 mt-6">
          <li className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <strong className="flex items-center gap-2 text-lg text-slate-900 mb-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Overall Score (0-100)
            </strong>
            <p className="text-slate-600 mb-0">This is the aggregate grade of how well your prompt performed across all test cases. An overall score above 90 generally indicates a highly stable prompt, while a score below 70 indicates a severe regression.</p>
          </li>
          <li className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <strong className="flex items-center gap-2 text-lg text-slate-900 mb-2">
              <Search className="w-5 h-5 text-rose-600" />
              The Trace Explorer
            </strong>
            <p className="text-slate-600 mb-0">This is the most powerful tool in MRDS. You can click on any individual failed test case to open the Trace Explorer. Here, you will see exactly what the AI outputted, compared to the expected output, and a detailed explanation of <strong>why</strong> it failed the evaluation.</p>
          </li>
        </ul>
      </FadeInOnScroll>
    </div>
  );
}
