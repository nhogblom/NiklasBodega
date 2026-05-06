import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { registerUser } from '../api/AuthenticationApiService.ts';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (success) {
      return;
    }
    if (password != passwordConfirm) {
      setError("Passwords don't match");
    }
    //TODO fler kontroller av lösen.

    setLoading(true);
    try {
      await registerUser(username, password, password);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch {
      setError('Failed to register.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <Navbar />

      <div className="flex-1 flex items-center justify-center relative overflow-hidden py-12">
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
              Create an account
            </h1>
            <p className="text-sm text-stone-500">
              Join us and start booking your stay
            </p>
          </div>

          <hr className="border-stone-200 mb-6" />

          {error && (
            <p className="text-red-600 text-sm text-center mb-4 bg-red-50 py-2 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-center mb-4 bg-green-50 py-2 rounded">
              {success}
            </p>
          )}

          <div className="mb-4">
            <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
            />
          </div>

          <div className="mb-4">
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
          </div>

          <div className="mb-2">
            <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none text-sm"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-900 text-white py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-800 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-stone-400">
              <span className="bg-white px-4">Already have an account?</span>
            </div>
          </div>
          <span
            onClick={() => navigate('/login')}
            className="mt-4 w-full block text-center border border-orange-900 text-orange-900 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-orange-50 transition"
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
