import { useEffect, useState } from 'react';
import { Mail, CheckCircle2, XCircle, Users } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function SettingsPage() {
  const [invites, setInvites] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchInvites = async () => {
    try {
      const data = await api.getInvitations();
      setInvites(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await api.createInvitation(email, role);
      setMsg('Invite sent successfully!');
      setEmail('');
      fetchInvites();
    } catch (err: any) {
      setMsg(err.response?.data?.detail || 'Failed to send invite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Organization Settings</h1>
        <p className="text-slate-500 mt-2">Manage your workspace and team members.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Invite Team Members</h2>
            <p className="text-sm text-slate-500">Add collaborators to your workspace.</p>
          </div>
        </div>

        <form onSubmit={handleInvite} className="flex gap-4 items-end mb-8">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <Input 
              type="email" 
              placeholder="colleague@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-48 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-11 px-3 border border-slate-200 rounded-xl bg-white text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Button type="submit" className="h-11 px-8" disabled={loading}>
            {loading ? 'Sending...' : 'Send Invite'}
          </Button>
        </form>
        {msg && <p className="text-sm font-medium text-indigo-600 mb-8">{msg}</p>}

        <h3 className="font-bold text-slate-900 mb-4">Pending Invitations</h3>
        {invites.length === 0 ? (
          <p className="text-slate-500 text-sm">No pending invitations.</p>
        ) : (
          <div className="space-y-3">
            {invites.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-semibold text-slate-900">{inv.email}</p>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{inv.role}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Token: {inv.token}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
