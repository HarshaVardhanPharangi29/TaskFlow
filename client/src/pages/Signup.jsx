import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const parse = schema.safeParse(form);
    if (!parse.success) {
      const errs = {};
      parse.error.issues.forEach((i) => (errs[i.path[0]] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/');
    } catch (e) {
      setServerError(e?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm card p-6">
        <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Get started in seconds</p>
        {serverError && <p className="text-red-600 mb-2 text-sm">{serverError}</p>}

        <label className="label">Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="input mb-2" />
        {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}

        <label className="label mt-3">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="input mb-2" />
        {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}

        <label className="label mt-3">Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} className="input mb-4" />
        {errors.password && <span className="text-xs text-red-600">{errors.password}</span>}

        <button disabled={loading} className="btn-primary w-full">{loading ? 'Creating...' : 'Create account'}</button>
        <p className="text-sm mt-3">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
