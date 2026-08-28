import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert, Users, Search, ShieldCheck, UserCheck, Activity, Database, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import axios from 'axios';
import { api } from '../lib/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

interface User {
  id: string;
  email: string;
  name: string | null;
  is_active: boolean;
  is_superadmin: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const { isSuperadmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/users`, { params: { search, size: 50 } }),
        api.getAdminStats().catch(() => null)
      ]);
      setUsers(usersRes.data.items);
      setStats(statsRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperadmin) {
      fetchData();
    }
  }, [search, isSuperadmin]);

  const handleElevate = async (userId: string) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/users/${userId}/elevate`);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update user");
    }
  };

  if (!isSuperadmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-rose-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto">This area is restricted to Super Administrators only. Please contact your system administrator if you need access.</p>
      </div>
    );
  }

  const superAdminCount = users.filter(u => u.is_superadmin).length;
  const activeUserCount = users.filter(u => u.is_active).length;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Control Center</h1>
          <p className="text-slate-500 mt-2 text-lg">Manage global platform access and organizational settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Users</p>
            <p className="text-3xl font-extrabold text-slate-900">{stats?.total_users || users.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Evals</p>
            <p className="text-3xl font-extrabold text-slate-900">{stats?.total_eval_runs || 0}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Routing</p>
            <p className="text-3xl font-extrabold text-slate-900">{stats?.total_routing_decisions || 0}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Cache</p>
            <p className="text-3xl font-extrabold text-slate-900">{stats?.total_cache_items || 0}</p>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
            </div>
            System Users Directory
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6 font-bold text-slate-600">User</TableHead>
                <TableHead className="font-bold text-slate-600">Role</TableHead>
                <TableHead className="font-bold text-slate-600">Joined</TableHead>
                <TableHead className="text-right pr-6 font-bold text-slate-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                        <div>
                          <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                          <div className="h-3 w-48 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><div className="h-6 w-24 bg-slate-200 rounded-full"></div></TableCell>
                    <TableCell><div className="h-5 w-32 bg-slate-200 rounded"></div></TableCell>
                    <TableCell className="pr-6"><div className="h-9 w-32 bg-slate-200 rounded ml-auto"></div></TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-slate-500 font-medium">
                    No users found matching "{search}".
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{user.name || 'Unknown User'}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.is_superadmin ? (
                        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-3 font-semibold shadow-sm">
                          Super Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-600 border-slate-200 px-3 font-medium bg-white">
                          Member
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-500 font-medium">
                      {new Date(user.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleElevate(user.id)}
                        className={`rounded-lg font-semibold transition-all ${
                          user.is_superadmin 
                            ? "text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700" 
                            : "text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        }`}
                      >
                        {user.is_superadmin ? 'Revoke Access' : 'Make Super Admin'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
