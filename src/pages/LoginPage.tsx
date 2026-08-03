import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, KeyRound, Loader2 } from 'lucide-react';
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
      setMessage('A login code has been sent to your email.');
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
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-100 p-3 rounded-full mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to MRDS</h1>
          <p className="text-slate-500 mt-2 text-center">
            Model Regression Detection System
          </p>
        </div>

        {!otpMode ? (
          <>
            <div className="flex justify-center mb-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                useOneTap
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Login Code
              </Button>
            </form>
          </>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="6-digit code"
                className="pl-10 text-center tracking-widest"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify & Sign In
            </Button>
            <button
              type="button"
              onClick={() => setOtpMode(false)}
              className="text-sm text-slate-500 hover:text-slate-700 w-full mt-2"
            >
              Back to email
            </button>
          </form>
        )}

        {message && (
          <div className="mt-4 p-3 bg-slate-50 text-slate-600 text-sm rounded-lg text-center border border-slate-100">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
