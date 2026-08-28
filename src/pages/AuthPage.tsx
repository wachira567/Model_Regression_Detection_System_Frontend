import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export default function AuthPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = async (response: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/google`, {
        access_token: response.access_token
      });
      login(res.data.access_token, res.data.user_id, res.data.org_id, res.data.is_superadmin);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google login failed'),
  });

  const requestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/auth/request-otp`, { email });
      setStep('otp');
    } catch (err: any) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
      login(res.data.access_token, res.data.user_id, res.data.org_id, res.data.is_superadmin);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError("Invalid or expired OTP.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Marketing Side - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to website</span>
          </Link>
          <div className="bg-slate-800 p-2 rounded-xl inline-block mb-8">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Evaluate with<br/>absolute certainty.
          </h1>
          <p className="text-xl text-slate-400 max-w-md leading-relaxed">
            Join the forward-thinking engineering teams protecting their generative AI applications with MRDS.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-max">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-300">Set up your first Golden Dataset in 2 minutes</span>
          </div>
          <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-max translate-x-8">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-300">Integrate into your CI/CD pipeline</span>
          </div>
        </div>
      </div>

      {/* Right Login Side */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative">
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>

        <div className="max-w-md w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome to MRDS</h2>
            <p className="text-slate-500">Log in or create an account to continue.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <Button 
            onClick={() => googleLogin()}
            disabled={loading}
            className="w-full h-14 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl font-bold text-lg mb-6 shadow-sm flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">Or continue with email</span>
            </div>
          </div>

          {step === 'email' ? (
            <form onSubmit={requestOTP} className="space-y-4">
              <div>
                <Input 
                  type="email" 
                  required 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-14 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-lg px-4"
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-md transition-all group"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    Send verification code
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={verifyOTP} className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Sent to {email}</span>
                <button type="button" onClick={() => setStep('email')} className="text-sm text-indigo-600 font-bold hover:underline">
                  Change
                </button>
              </div>
              <Input 
                type="text" 
                required 
                placeholder="Enter 6-digit code" 
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="h-14 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-lg px-4 tracking-widest text-center"
                disabled={loading}
              />
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-md transition-all"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In"}
              </Button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-slate-500">
            By continuing, you agree to our <a href="#" className="underline hover:text-slate-900">Terms of Service</a> and <a href="#" className="underline hover:text-slate-900">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
