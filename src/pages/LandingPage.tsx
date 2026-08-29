import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Loader2, Mail, KeyRound, Sparkles, Activity, Shield, Zap, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 font-sans overflow-hidden">
      {/* Cinematic Abstract Hero */}
      <div className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-rose-600/20 rounded-full blur-[120px] mix-blend-screen"
          />
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity, y: useTransform(scrollY, [0, 500], [0, 200]) }}
          className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Introducing the Smart Hybrid Engine</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              Detect Regressions. <br />
              <span className="cinematic-text">Before They Ship.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              The enterprise-grade CI/CD pipeline for Large Language Models. 
              Catch hallucinations, track drift, and optimize costs with our LangGraph agentic swarm.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-md mx-auto glass-panel p-8 rounded-3xl"
          >
            {!otpMode ? (
              <div className="space-y-4">
                <div className="flex justify-center bg-white/5 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <GoogleLogin onSuccess={handleGoogleSuccess} theme="filled_black" shape="pill" size="large" text="continue_with" />
                </div>
                {!showEmailLogin ? (
                  <button onClick={() => setShowEmailLogin(true)} className="text-sm text-slate-400 hover:text-white w-full py-2">Or continue with email</button>
                ) : (
                  <form onSubmit={handleRequestOTP} className="space-y-4 pt-4 border-t border-white/10">
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                      <Input type="email" placeholder="name@company.com" className="pl-12 h-12 bg-white/5 border-white/10 text-white rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-slate-200 rounded-xl font-bold" disabled={loading}>
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Code'}
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="text-center">
                  <h3 className="font-semibold text-white">Check your email</h3>
                  <p className="text-sm text-slate-400">Code sent to {email}</p>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <Input type="text" placeholder="000000" className="pl-12 h-12 bg-white/5 border-white/10 text-white tracking-[0.5em] text-center rounded-xl" value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))} maxLength={6} required autoFocus />
                </div>
                <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold" disabled={loading || otpCode.length !== 6}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verify & Sign In'}
                </Button>
              </form>
            )}
            {message && <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-xl text-center">{message}</div>}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-500"
        >
          <span className="text-sm font-bold uppercase tracking-widest">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>
      </div>

      {/* Feature Sections */}
      <div className="relative z-20 bg-slate-950 pt-32 pb-48 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Activity className="w-8 h-8 text-emerald-400" />,
                title: "Real-time Telemetry",
                desc: "Monitor latency, token usage, and accuracy across every prompt version instantly."
              },
              {
                icon: <Zap className="w-8 h-8 text-indigo-400" />,
                title: "Smart Hybrid Eval",
                desc: "Toggle between 1x Fast Pass grading and 3x Deep Agentic Audits powered by LangGraph."
              },
              {
                icon: <Shield className="w-8 h-8 text-rose-400" />,
                title: "Enterprise Governance",
                desc: "Human-in-the-loop approvals, SSO, and strict Role-Based Access Control out of the box."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-10 rounded-3xl group hover:bg-white/10 transition-colors duration-500">
                <div className="mb-6 p-4 bg-white/5 inline-block rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
