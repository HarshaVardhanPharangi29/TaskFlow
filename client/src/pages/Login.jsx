import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
      await login(form.email, form.password);
      navigate('/');
    } catch (e) {
      setServerError(e?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm card p-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-4">Sign in to continue</p>
        {serverError && <p className="text-red-600 mb-2 text-sm">{serverError}</p>}
        <label className="label">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="input mb-2" />
        {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}

        <label className="label mt-3">Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} className="input mb-4" />
        {errors.password && <span className="text-xs text-red-600">{errors.password}</span>}

        <button disabled={loading} className="btn-primary w-full">{loading ? 'Signing in...' : 'Login'}</button>
        <p className="text-sm mt-3">No account? <Link className="text-blue-600" to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}
