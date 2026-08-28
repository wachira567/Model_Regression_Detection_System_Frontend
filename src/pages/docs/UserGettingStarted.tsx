import { FadeInOnScroll } from '../../lib/AnimationUtils';

export default function UserGettingStarted() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
          User Guide
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Welcome to MRDS
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          The Model Regression Detection System (MRDS) helps you confidently test and monitor your AI models. This guide will walk you through the basics, no coding required.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What is a "Regression"?</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          In traditional software, a "regression" is when a feature that used to work suddenly breaks after an update. 
          With AI, regressions happen all the time. If you tweak a prompt to fix a bug in how the AI translates French, you might accidentally break how it translates Spanish.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          MRDS acts as a safety net. Before you deploy a new AI model or prompt, MRDS runs it against hundreds of past conversations (your baseline) to ensure its quality hasn't dropped.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Core Concepts</h2>
        <div className="space-y-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. The Golden Dataset</h3>
            <p className="text-slate-600 text-sm mb-0">
              Think of this as your "answer key". It's a collection of inputs (e.g., "Summarize this article") and the ideal, perfect outputs you expect the AI to generate.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Prompt Configurations</h3>
            <p className="text-slate-600 text-sm mb-0">
              These are the instructions you give to the AI. You can save multiple versions in MRDS (e.g., "Version 1: Polite Assistant" vs "Version 2: Concise Assistant") and compare them side-by-side.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Evaluation Runs</h3>
            <p className="text-slate-600 text-sm mb-0">
              An Evaluation Run is the actual test. MRDS takes a Prompt Configuration, feeds it every question from your Golden Dataset, and scores the answers on a scale of 0 to 100 based on accuracy, tone, and safety.
            </p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mt-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Next Steps</h3>
          <p className="text-slate-600 mb-0">
            Ready to dive in? Head over to the <a href="/docs/datasets" className="text-indigo-600 font-bold hover:underline">Managing Datasets</a> section to learn how to upload your first Golden Dataset and start testing!
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
