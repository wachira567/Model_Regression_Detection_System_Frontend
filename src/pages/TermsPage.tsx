import { FadeInOnScroll } from '../lib/AnimationUtils';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 bg-white min-h-[80vh]">
      <FadeInOnScroll>
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Terms of Service</h1>
        <p className="text-slate-500 mb-6 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-slate prose-indigo max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the MRDS platform, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Services.
          </p>

          <h2>2. Use of the Services</h2>
          <p>
            You must follow any policies made available to you within the Services. You agree not to misuse the Services or help anyone else do so.
          </p>

          <h2>3. Your Content</h2>
          <p>
            You retain ownership of any intellectual property rights that you hold in the content you submit to the Services. When you upload content to our Services, you give MRDS a worldwide license to use, host, store, reproduce, and modify such content solely for the purpose of operating the Services.
          </p>

          <h2>4. Termination</h2>
          <p>
            We may suspend or terminate your access to the Services at any time, with or without cause, with or without notice.
          </p>

          <h2>5. Disclaimers</h2>
          <p>
            The Services are provided "AS-IS". We disclaim all warranties, express or implied, including the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
