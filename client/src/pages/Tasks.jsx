import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

export default function Tasks() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ title: '', description: '', status: 'todo' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const filtered = useMemo(() => items, [items]);

  const fetchList = async (params = {}) => {
    const { data } = await api.get('/tasks', { params });
    setItems(data);
  };

  useEffect(() => { fetchList(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        const { data } = await api.put(`/tasks/${editingId}`, form);
        setItems((prev) => prev.map((t) => (t._id === editingId ? data : t)));
        setEditingId(null);
      } else {
        const { data } = await api.post('/tasks', form);
        setItems((prev) => [data, ...prev]);
      }
      setForm({ title: '', description: '', status: 'todo' });
    } catch (e) {
      setError(e?.response?.data?.message || 'Save failed');
    }
  };

  const onEdit = (task) => {
    setEditingId(task._id);
    setForm({ title: task.title, description: task.description, status: task.status });
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    setItems((prev) => prev.filter((t) => t._id !== id));
  };

  const onSearch = async (e) => {
    e.preventDefault();
    await fetchList({ q: q || undefined, status: status || undefined });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-3">{editingId ? 'Edit Task' : 'Create Task'}</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary">{editingId ? 'Update' : 'Create'}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm({ title:'', description:'', status:'todo' }); }} className="btn">Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-3">Tasks</h2>
        <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
          <input placeholder="Search title..." className="input flex-1" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button className="btn">Filter</button>
        </form>

        <ul className="space-y-2">
          {filtered.map((t) => (
            <li key={t._id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg flex justify-between items-start gap-3">
              <div>
                <p className="font-medium">{t.title}</p>
                {t.description && <p className="text-sm text-gray-600 dark:text-gray-400">{t.description}</p>}
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full 
                  ${t.status === 'done' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : ''}
                  ${t.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' : ''}
                  ${t.status === 'todo' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' : ''}
                `}>{t.status}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(t)} className="btn">Edit</button>
                <button onClick={() => onDelete(t._id)} className="btn bg-red-600 text-white hover:bg-red-700">Delete</button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-sm text-gray-500 dark:text-gray-400">No tasks found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
