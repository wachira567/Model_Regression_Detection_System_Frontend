import { FadeInOnScroll } from '../lib/AnimationUtils';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 bg-white min-h-[80vh]">
      <FadeInOnScroll>
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 mb-6 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-slate prose-indigo max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect about you to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our Services.</li>
            <li>Perform internal operations, including to prevent fraud and abuse of our Services.</li>
            <li>Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events.</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>
          
          <h2>4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at legal@mrds.example.com.
          </p>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
