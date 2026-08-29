import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Loader2, Mail, KeyRound, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/google`, { token: credentialResponse.credential });
      const { access_token, user_id, organization_id, is_superadmin } = res.data;
      login(access_token, user_id, organization_id, is_superadmin);
      navigate('/dashboard');
    } catch (error) {
      console.error("Auth failed", error);
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/email/request`, { email });
      setOtpMode(true);
    } catch (error) {
      setMessage('Failed to send code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/email/verify`, { email, code: otpCode });
      const { access_token, user_id, organization_id, is_superadmin } = res.data;
      login(access_token, user_id, organization_id, is_superadmin);
      navigate('/dashboard');
    } catch (error) {
      setMessage('Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-white selection:text-black">
      {/* Fullscreen Video Hero */}
      <div className="relative h-screen flex flex-col justify-between overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full bg-black z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            poster="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-grid-of-squares-25254-large.mp4" type="video/mp4" />
          </video>
          {/* Subtle vignette/gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black pointer-events-none" />
        </div>

        {/* Top Nav Placeholder / Brand */}
        <div className="relative z-10 p-8 flex justify-between items-center w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white rounded-sm" />
            <span className="font-bold tracking-tight text-xl">Antigravity</span>
          </div>
          <a href="#login" className="text-sm font-medium hover:text-slate-300 transition-colors">Sign In</a>
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-8 w-full flex-1 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">
              Engineering rigor <br/>
              <span className="text-slate-500">for AI models.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-normal max-w-xl mb-12 leading-relaxed">
              The deterministic CI/CD pipeline for Large Language Models. 
              Catch regressions, track drift, and optimize costs with a sophisticated agentic evaluation engine.
            </p>
            
            {/* Inline Login Form (No Cards) */}
            <div id="login" className="max-w-md">
              {!otpMode ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <GoogleLogin onSuccess={handleGoogleSuccess} theme="filled_black" shape="rectangular" size="large" text="continue_with" />
                  </div>
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-white/20 flex-1" />
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">Or</span>
                    <div className="h-px bg-white/20 flex-1" />
                  </div>
                  <form onSubmit={handleRequestOTP} className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input 
                        type="email" 
                        placeholder="Work email address" 
                        className="pl-11 h-12 bg-transparent border-white/20 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white transition-all" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <Button type="submit" className="h-12 px-8 bg-white text-black hover:bg-slate-200 rounded-none font-medium" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue'}
                    </Button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <p className="text-sm text-slate-400">Enter the 6-digit code sent to <span className="text-white">{email}</span></p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input 
                        type="text" 
                        placeholder="000000" 
                        className="pl-11 h-12 bg-transparent border-white/20 text-white tracking-[0.5em] text-center rounded-none focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white transition-all" 
                        value={otpCode} 
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))} 
                        maxLength={6} 
                        required 
                        autoFocus 
                      />
                    </div>
                    <Button type="submit" className="h-12 px-8 bg-white text-black hover:bg-slate-200 rounded-none font-medium" disabled={loading || otpCode.length !== 6}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                    </Button>
                  </form>
              )}
              {message && <div className="mt-4 text-red-400 text-sm">{message}</div>}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Sections - Cardless Editorial Layout */}
      <div className="relative z-20 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Feature 01 */}
          <div className="border-t border-white/10 grid md:grid-cols-2">
            <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between min-h-[400px]">
              <span className="text-xs font-mono text-slate-500">01 / TELEMETRY</span>
              <div>
                <h3 className="text-3xl font-medium tracking-tight mb-4">Real-time observability.</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Monitor latency, token usage, and accuracy across every prompt version instantly. 
                  Stream raw traces directly into your existing APM tools.
                </p>
              </div>
            </div>
            <div className="p-8 md:p-16 flex items-center justify-center bg-[#050505]">
              {/* Abstract structural graphic */}
              <div className="w-full max-w-sm flex flex-col gap-2">
                {[45, 80, 60, 95, 30].map((width, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-slate-600 w-8">P{i+1}</span>
                    <div className="h-1 bg-white/10 flex-1 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="absolute inset-y-0 left-0 bg-white" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 02 */}
          <div className="border-t border-white/10 grid md:grid-cols-2">
            <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center bg-[#050505] md:order-1 order-2">
              <div className="w-full max-w-sm">
                <div className="border border-white/20 p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-sm font-medium">Fast Pass</span>
                    <span className="text-xs font-mono text-emerald-400">PASS</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-sm font-medium">Deep Audit (Agentic)</span>
                    <span className="text-xs font-mono text-emerald-400">PASS</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hallucination Check</span>
                    <span className="text-xs font-mono text-slate-500">PENDING</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-16 flex flex-col justify-between min-h-[400px] md:order-2 order-1">
              <span className="text-xs font-mono text-slate-500">02 / EVALUATION</span>
              <div>
                <h3 className="text-3xl font-medium tracking-tight mb-4">Smart Hybrid Eval.</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Toggle between 1x Fast Pass deterministic grading and 3x Deep Agentic Audits powered by LangGraph. 
                  Optimize speed versus rigor dynamically.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 03 */}
          <div className="border-t border-white/10 grid md:grid-cols-2">
            <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between min-h-[400px]">
              <span className="text-xs font-mono text-slate-500">03 / GOVERNANCE</span>
              <div>
                <h3 className="text-3xl font-medium tracking-tight mb-4">Enterprise Grade.</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Human-in-the-loop approvals, SSO, and strict Role-Based Access Control out of the box. 
                  Deploy with confidence behind corporate firewalls.
                </p>
              </div>
            </div>
            <div className="p-8 md:p-16 flex items-center justify-center bg-[#050505]">
              <div className="w-full max-w-sm flex items-center gap-4">
                <Shield className="w-12 h-12 text-white/20" strokeWidth={1} />
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-white/10 w-full" />
                  <div className="h-2 bg-white/10 w-3/4" />
                  <div className="h-2 bg-white/10 w-1/2" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10" />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-8 text-center text-sm text-slate-600">
        &copy; {new Date().getFullYear()} Antigravity Systems. All rights reserved.
      </footer>
    </div>
  );
}
