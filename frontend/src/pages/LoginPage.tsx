import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { loginUser } from '../api/AuthenticationApiService.ts';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginUser(username, password);
      setLoading(false);
      login(username);
      navigate('/');
    } catch (error) {
      setError('Could not log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Navbar />

      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl border border-stone-100">
          <div className="text-center mb-8">
            <div className="text-lg font-serif font-bold tracking-tighter text-orange-900 mb-4">
              NIKLAS BODEGA
            </div>
            <h1 className="text-2xl font-serif text-stone-800 mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-stone-500">
              Sign in to manage your reservations
            </p>
          </div>
          <hr className="border-stone-200 mb-6" />
          <div className="mb-4">
            <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
            />
          </div>
          <div className="mb-2">
            <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
            />
            <div className="text-right mt-1">
              <a
                onClick={() => navigate('/forgotpassword')}
                className="text-xs text-orange-700 hover:text-orange-900"
              >
                Forgot password?
              </a>
            </div>
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-900 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition mt-4"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-stone-400">
              <span className="bg-white px-4">New here?</span>
            </div>
          </div>
          <span
            onClick={() => navigate('/register')}
            className="mt-4 w-full block text-center border border-orange-900 text-orange-900 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition"
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
