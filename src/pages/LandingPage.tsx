import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Mail, KeyRound, Loader2, ArrowRight, ShieldCheck, Zap, Database, Code2 } from 'lucide-react';
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
      <nav className="fixed w-full top-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">MRDS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">Architecture</a>
            <a href="https://github.com/wachira567" target="_blank" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">GitHub</a>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-white text-slate-900 hover:bg-slate-200 rounded-full px-6 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden flex flex-col items-center justify-center px-4 selection:bg-indigo-500/30">
        
        {/* Mesmerizing Background Setup */}
        <div className="absolute inset-0 bg-slate-950 -z-30"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20"></div>

        {/* Dynamic Glows */}
        <motion.div 
          animate={{ 
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-emerald-500/30 rounded-full blur-[120px] opacity-60 -z-20 mix-blend-screen"
        ></motion.div>

        <div className="max-w-7xl mx-auto z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-semibold mb-8 backdrop-blur-md shadow-2xl">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              Open Source Portfolio Project
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.05] mb-6">
                AI Evaluation,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-300 to-indigo-400 animate-gradient-x bg-[length:200%_auto]">
                  Deterministic.
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-lg md:text-2xl text-slate-400 font-medium mb-12 max-w-xl leading-relaxed">
                An open-source showcase platform built to detect LLM regressions in production using Golden Datasets, Semantic Caching, and rigorous A/B testing.
              </p>
            </motion.div>

            {/* Login Area (Moved to Left Column for Layout) */}
            <motion.div variants={fadeInUp} className="w-full max-w-sm bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    className="text-sm font-medium text-slate-400 hover:text-white transition-colors w-full py-2"
                  >
                    Or continue with email
                  </button>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4 border-t border-white/10"
                    onSubmit={handleRequestOTP}
                  >
                    <div className="relative group">
                      <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-indigo-400" />
                      <Input
                        type="email"
                        placeholder="name@company.com"
                        className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all shadow-inner"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-semibold transition-all duration-300 shadow-md group" 
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
                className="w-full space-y-6 relative z-10"
              >
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-white">Check your email</h3>
                  <p className="text-sm text-slate-400">
                    We sent a code to <span className="text-white font-medium">{email}</span>
                  </p>
                </div>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-3 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-emerald-400" />
                  <Input
                    type="text"
                    placeholder="0 0 0 0 0 0"
                    className="pl-12 h-12 bg-white/5 border-white/10 text-white text-center tracking-[0.5em] text-lg font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all shadow-inner"
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
              <div className="p-3 bg-indigo-500/20 border border-indigo-500/50 text-indigo-200 text-sm rounded-xl text-center w-full mt-4">
                {message}
              </div>
            )}
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Dashboard Preview */}
          <div className="hidden lg:block relative h-[600px] w-full perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: -20, rotateX: 10, x: 50 }}
              animate={{ opacity: 1, rotateY: -15, rotateX: 5, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 w-full h-full transform-style-3d"
            >
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-[120%] h-full bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden"
              >
                {/* Mock UI Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="text-slate-400 font-mono text-xs">mrds-eval-engine-v1</div>
                </div>

                {/* Mock UI Content */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="text-slate-400 text-sm mb-1">Regression Score</div>
                    <div className="text-3xl font-black text-white">99.8%</div>
                    <div className="text-emerald-400 text-xs mt-2 flex items-center gap-1"><ArrowRight className="w-3 h-3 -rotate-45" /> +2.1% from baseline</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="text-slate-400 text-sm mb-1">Evaluations/sec</div>
                    <div className="text-3xl font-black text-white">4,250</div>
                    <div className="text-indigo-400 text-xs mt-2">FastAPI Async Workers</div>
                  </div>
                </div>

                {/* Mock Code Block */}
                <div className="bg-[#0d1117] rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/5 overflow-hidden">
                  <div className="flex items-center gap-2 mb-3 text-slate-500">
                    <Code2 className="w-4 h-4" /> <span>worker.py</span>
                  </div>
                  <pre className="text-emerald-400/90 leading-relaxed">
                    <code>{`@app.post("/eval-runs")
async def trigger_run(
    payload: EvalRunCreate,
    bg_tasks: BackgroundTasks
):
    run = await db.create(payload)
    bg_tasks.add_task(evaluate, run.id)
    return {"status": "accepted"}`}</code>
                  </pre>
                </div>
                
                {/* Floating Elements on top of the dashboard */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-12 top-1/3 bg-slate-800/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3"
                >
                  <div className="bg-rose-500/20 p-2 rounded-lg text-rose-400"><ShieldCheck className="w-5 h-5" /></div>
                  <div>
                    <div className="text-white font-bold text-sm">Anomaly Blocked</div>
                    <div className="text-slate-400 text-xs">Prompt variation failed.</div>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story / Features Section */}
      <section id="features" className="py-32 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        {/* Subtle mesh in the white section */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
              Built for depth.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              A comprehensive exploration into modern full-stack development and AI observability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="h-8 w-8 text-indigo-600" />,
                title: "Data Pipelines",
                desc: "Demonstrating complex relational data modeling and background processing for automated ground-truth curation.",
                color: "bg-indigo-50",
                borderColor: "border-indigo-100"
              },
              {
                icon: <Zap className="h-8 w-8 text-amber-600" />,
                title: "Performance",
                desc: "Implementing vector-based semantic caching to drastically reduce LLM API costs and response latencies.",
                color: "bg-amber-50",
                borderColor: "border-amber-100"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
                title: "Architecture",
                desc: "Showcasing a robust FastAPI and React stack with secure authentication, multi-tenancy, and clean RBAC.",
                color: "bg-emerald-50",
                borderColor: "border-emerald-100"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
                className="group bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10 ${feature.color}`}></div>
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-8 border ${feature.borderColor} group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
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
