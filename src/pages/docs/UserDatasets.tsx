import { FadeInOnScroll } from '../../lib/AnimationUtils';
import { FileUp, Table, CheckCircle2 } from 'lucide-react';

export default function UserDatasets() {
  return (
    <div className="prose prose-slate prose-indigo max-w-none">
      <FadeInOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
          User Guide
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Managing Datasets
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed mb-10">
          Learn how to upload, curate, and organize your test cases so that MRDS can automatically evaluate your AI models.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Formatting your CSV</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          The easiest way to import a Golden Dataset is by uploading a CSV file. MRDS expects your CSV to have exactly two columns: <strong>Input</strong> and <strong>Expected Output</strong>.
        </p>
        
        <div className="bg-slate-900 rounded-xl overflow-hidden mb-8 border border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="p-4 text-sm font-bold text-slate-300 border-b border-slate-700">input</th>
                <th className="p-4 text-sm font-bold text-slate-300 border-b border-slate-700">expected_output</th>
              </tr>
            </thead>
            <tbody className="text-slate-400 text-sm">
              <tr>
                <td className="p-4 border-b border-slate-800">Translate "Hello" to French.</td>
                <td className="p-4 border-b border-slate-800">Bonjour.</td>
              </tr>
              <tr>
                <td className="p-4">What is the capital of Japan?</td>
                <td className="p-4">Tokyo.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How to Upload</h2>
        <ul className="space-y-4 mt-6">
          <li className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-slate-900 mb-1">1. Navigate to Datasets</strong>
              <p className="text-slate-600">Click on "Datasets" in the left-hand sidebar of your dashboard.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-slate-900 mb-1">2. Click Upload CSV</strong>
              <p className="text-slate-600">Drag and drop your formatted CSV file into the upload modal. Give your dataset a memorable name, like "Customer Support Edge Cases".</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-slate-900 mb-1">3. Review and Save</strong>
              <p className="text-slate-600">MRDS will automatically preview the first few rows. If everything looks correct, click Save. You are now ready to run an evaluation!</p>
            </div>
          </li>
        </ul>
      </FadeInOnScroll>
    </div>
  );
}
