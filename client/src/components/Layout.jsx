import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-inner" />
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600">{user?.email}</span>
            <button onClick={logout} className="inline-flex items-center rounded-md bg-gray-900 text-white px-3 py-1.5 text-sm hover:opacity-90">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-[220px_1fr] gap-6">
        <aside className="hidden md:block">
          <nav className="sticky top-20 space-y-1">
            <NavLink to="/" end className={({ isActive }) => `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}>Home</NavLink>
            <NavLink to="/profile" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}>Profile</NavLink>
            <NavLink to="/tasks" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}>Tasks</NavLink>
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
