import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Mail, KeyRound, Loader2, ArrowRight, ShieldCheck, Zap, Database } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export default function LandingPage() {
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
      const res = await axios.post(`${API_BASE_URL}/auth/google`, {
        token: credentialResponse.credential
      });
      
      const { access_token, user_id, organization_id, is_superadmin } = res.data;
      login(access_token, user_id, organization_id, is_superadmin);
      navigate('/');
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Failed to authenticate with server. Please try again.");
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${API_BASE_URL}/auth/email/request`, { email });
      setOtpMode(true);
      setMessage('A secure login code has been sent to your email.');
    } catch (error) {
      setMessage('Failed to send code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/email/verify`, {
        email,
        code: otpCode
      });
      const { access_token, user_id, organization_id, is_superadmin } = res.data;
      login(access_token, user_id, organization_id, is_superadmin);
      navigate('/');
    } catch (error) {
      setMessage('Invalid or expired code.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MRDS</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">Features</a>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Subtle Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100/50 to-emerald-50/50 rounded-full blur-[100px] opacity-70 -z-10 animate-pulse"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto z-10"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-700 text-sm font-semibold mb-8 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Open Source Portfolio Project
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[1.05] mb-6">
              AI Evaluation,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">Engineered.</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-lg md:text-2xl text-slate-600 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
              An open-source showcase platform built to detect LLM regressions in production using Golden Datasets, Semantic Caching, and rigorous A/B testing.
            </p>
          </motion.div>

          {/* Login Area */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center space-y-6 w-full max-w-sm mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            {!otpMode ? (
              <div className="w-full space-y-4">
                <div className="flex justify-center transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Login Failed')}
                    useOneTap
                    theme="outline"
                    shape="pill"
                    size="large"
                    text="continue_with"
                  />
                </div>

                {!showEmailLogin ? (
                  <button 
                    onClick={() => setShowEmailLogin(true)}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors w-full py-2"
                  >
                    Or continue with email
                  </button>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4 border-t border-slate-100"
                    onSubmit={handleRequestOTP}
                  >
                    <div className="relative group">
                      <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
                      <Input
                        type="email"
                        placeholder="name@company.com"
                        className="pl-12 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all shadow-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-semibold transition-all duration-300 shadow-md group" 
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          Send Code
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </div>
            ) : (
              <motion.form 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onSubmit={handleVerifyOTP} 
                className="w-full space-y-6"
              >
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-slate-900">Check your email</h3>
                  <p className="text-sm text-slate-500">
                    We sent a code to <span className="text-slate-800 font-medium">{email}</span>
                  </p>
                </div>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-3 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
                  <Input
                    type="text"
                    placeholder="0 0 0 0 0 0"
                    className="pl-12 h-12 bg-white border-slate-200 text-slate-900 text-center tracking-[0.5em] text-lg font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all shadow-sm"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={6}
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-md shadow-emerald-500/20" 
                    disabled={loading || otpCode.length !== 6}
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verify & Sign In'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setOtpMode(false)}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 w-full h-10 transition-colors"
                  >
                    Use a different email
                  </button>
                </div>
              </motion.form>
            )}

            {message && (
              <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl text-center w-full">
                {message}
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Story / Features Section */}
      <section id="features" className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Built for depth.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              A comprehensive exploration into modern full-stack development and AI observability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="h-6 w-6 text-indigo-500" />,
                title: "Data Pipelines",
                desc: "Demonstrating complex relational data modeling and background processing for automated ground-truth curation."
              },
              {
                icon: <Zap className="h-6 w-6 text-amber-500" />,
                title: "Performance",
                desc: "Implementing vector-based semantic caching to drastically reduce LLM API costs and response latencies."
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
                title: "Architecture",
                desc: "Showcasing a robust FastAPI and React stack with secure authentication, multi-tenancy, and clean RBAC."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>&copy; {new Date().getFullYear()} MRDS Open Source Project. Crafted for showcase.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
