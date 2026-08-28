import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Mail, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export default function AuthPage() {
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
      navigate('/dashboard');
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
      navigate('/dashboard');
    } catch (error) {
      setMessage('Invalid or expired code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-100 selection:text-indigo-900">
      
      <div className="absolute top-8 left-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-slate-900 p-1.5 rounded-lg group-hover:bg-indigo-600 transition-colors">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">MRDS</span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500">Sign in to your account to continue</p>
        </div>

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
                      Send Login Code
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
                className="pl-12 h-12 bg-slate-50 border-slate-200 text-slate-900 text-center tracking-[0.5em] text-lg font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all shadow-inner"
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
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl text-center w-full">
            {message}
          </div>
        )}
      </motion.div>
    </div>
  );
}
