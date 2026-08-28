import { useEffect, useState } from 'react';
import { Mail, Users, User as UserIcon } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'workspace' | 'profile'>('workspace');
  
  // Workspace State
  const [invites, setInvites] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loadingWorkspace, setLoadingWorkspace] = useState(false);
  const [msgWorkspace, setMsgWorkspace] = useState('');

  // Profile State
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [msgProfile, setMsgProfile] = useState('');

  const fetchInvites = async () => {
    try {
      const data = await api.getInvitations();
      setInvites(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await api.getUserProfile();
      setProfile(data);
      if (data.name) setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvites();
    fetchProfile();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingWorkspace(true);
    setMsgWorkspace('');
    try {
      await api.createInvitation(email, role);
      setMsgWorkspace('Invite sent successfully!');
      setEmail('');
      fetchInvites();
    } catch (err: any) {
      setMsgWorkspace(err.response?.data?.detail || 'Failed to send invite');
    } finally {
      setLoadingWorkspace(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProfile(true);
    setMsgProfile('');
    try {
      const updated = await api.updateUserProfile(name);
      setProfile(updated);
      setMsgProfile('Profile updated successfully!');
    } catch (err: any) {
      setMsgProfile(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoadingProfile(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-2">Manage your workspace and personal profile.</p>
      </div>

      <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === 'workspace' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Workspace
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            activeTab === 'profile' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          My Profile
        </button>
      </div>

      {activeTab === 'workspace' ? (
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
            <Button type="submit" className="h-11 px-8" disabled={loadingWorkspace}>
              {loadingWorkspace ? 'Sending...' : 'Send Invite'}
            </Button>
          </form>
          {msgWorkspace && <p className="text-sm font-medium text-indigo-600 mb-8">{msgWorkspace}</p>}

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
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Personal Details</h2>
              <p className="text-sm text-slate-500">Update your profile information.</p>
            </div>
          </div>
          
          {profile ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address (Read-only)</label>
                <Input type="email" value={profile.email} disabled className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Your Name</label>
                <Input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <Button type="submit" disabled={loadingProfile}>
                {loadingProfile ? 'Saving...' : 'Save Profile'}
              </Button>
              {msgProfile && <p className="text-sm font-medium text-emerald-600 mt-2">{msgProfile}</p>}
            </form>
          ) : (
            <div className="h-32 flex items-center justify-center text-slate-400">Loading profile...</div>
          )}
        </div>
      )}
    </div>
  );
}
