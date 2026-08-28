import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';

export default function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAccept = async () => {
    if (!token) return;
    setLoading(true);
    setMsg('');
    try {
      await api.acceptInvitation(token);
      setSuccess(true);
      setMsg('Successfully joined the organization!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: any) {
      setMsg(err.response?.data?.detail || 'Failed to accept invitation');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-slate-900">Invalid Invite Link</h1>
        <p className="text-slate-500 mt-2">No token provided in the URL.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <MailCheck className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">You've been invited!</h1>
        <p className="text-slate-500 mb-8">
          Join your team's workspace on MRDS to collaborate on AI evaluations.
        </p>

        {success ? (
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl font-bold">
            {msg}
          </div>
        ) : (
          <div className="space-y-4">
            <Button 
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg"
              onClick={handleAccept}
              disabled={loading}
            >
              {loading ? 'Joining...' : 'Accept Invitation'}
            </Button>
            {msg && <p className="text-sm font-semibold text-rose-500">{msg}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
