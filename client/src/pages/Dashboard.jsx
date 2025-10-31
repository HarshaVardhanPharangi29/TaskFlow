import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-medium">{user?.email}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Welcome</p>
          <p className="font-medium">{user?.name}</p>
        </div>
        <div className="card p-5 flex items-center justify-between">
          <p className="font-medium">Session</p>
          <button onClick={logout} className="btn-muted">Logout</button>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-semibold mb-3">Quick links</h2>
        <div className="flex flex-wrap gap-3">
          <Link className="btn-primary" to="/profile">Edit Profile</Link>
          <Link className="btn" style={{border:'1px solid rgba(0,0,0,0.1)'}} to="/tasks">Manage Tasks</Link>
        </div>
      </div>
    </div>
  );
}
