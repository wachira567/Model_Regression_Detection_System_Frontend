import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Mail, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Glassmorphism Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10 hover:border-slate-600/50">
          
          <div className="flex flex-col items-center mb-10">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px] mb-6 shadow-lg shadow-indigo-500/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-emerald-400 opacity-50 blur-lg rounded-2xl"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-slate-950 rounded-2xl">
                <Activity className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight text-center">
              Welcome to MRDS
            </h1>
            <p className="text-slate-400 mt-3 text-center text-sm font-medium px-4">
              Model Regression Detection System
            </p>
          </div>

          {!otpMode ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-center transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log('Login Failed')}
                  useOneTap
                  theme="filled_black"
                  shape="pill"
                />
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-700/50"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Or continue with email
                </span>
                <div className="flex-grow border-t border-slate-700/50"></div>
              </div>

              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    className="pl-12 h-12 bg-slate-950/50 border-slate-700/50 text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-white/10 group" 
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
              </form>
            </div>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-400">
                    Enter the 6-digit code sent to <span className="text-slate-200 font-medium">{email}</span>
                  </p>
                </div>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-3 h-5 w-5 text-slate-500 transition-colors group-focus-within:text-emerald-400" />
                  <Input
                    type="text"
                    placeholder="0 0 0 0 0 0"
                    className="pl-12 h-12 bg-slate-950/50 border-slate-700/50 text-slate-200 text-center tracking-[0.5em] text-lg font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl transition-all"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={6}
                    required
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30" 
                  disabled={loading || otpCode.length !== 6}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Verify & Sign In'
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => setOtpMode(false)}
                  className="text-sm font-medium text-slate-400 hover:text-white w-full h-10 transition-colors"
                >
                  Use a different email
                </button>
              </div>
            </form>
          )}

          {message && (
            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm rounded-xl text-center backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
              {message}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-xs font-medium tracking-wide">
          &copy; {new Date().getFullYear()} MRDS Enterprise. All rights reserved.
        </div>
      </div>
    </div>
  );
}
