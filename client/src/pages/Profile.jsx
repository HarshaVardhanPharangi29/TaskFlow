import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [message, setMessage] = useState('');

  useEffect(() => setName(user?.name || ''), [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile', { name });
      await refreshProfile();
      setMessage('Profile updated');
      setTimeout(() => setMessage(''), 1500);
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input bg-gray-100" value={user?.email} disabled />
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-primary">Save</button>
            {message && <p className="text-sm text-green-700">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
