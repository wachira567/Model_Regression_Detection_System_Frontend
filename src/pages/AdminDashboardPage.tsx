import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert, Users, Search, ShieldCheck } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/users`, {
        params: { search, size: 50 }
      });
      setUsers(res.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleElevate = async (userId: string) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/users/${userId}/elevate`);
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update user");
    }
  };

  if (!isSuperadmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <ShieldAlert className="h-16 w-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
        <p className="text-slate-500 mt-2">You do not have Super Admin privileges.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-indigo-600" />
            Super Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Manage global system settings and user access.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <Users className="h-5 w-5" />
            System Users
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search users..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium text-slate-900">{user.name || 'Unknown'}</div>
                    <div className="text-sm text-slate-500">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    {user.is_superadmin ? (
                      <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none">
                        Super Admin
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-600">
                        User
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleElevate(user.id)}
                      className={user.is_superadmin ? "text-rose-600 border-rose-200 hover:bg-rose-50" : ""}
                    >
                      {user.is_superadmin ? 'Revoke Admin' : 'Make Admin'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
