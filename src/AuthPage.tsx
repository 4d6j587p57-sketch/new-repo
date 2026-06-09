import { useState, FormEvent } from 'react';
import { supabase } from './supabase';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

type Mode = 'login' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'login') {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
    } else {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <a href="/" className="text-white font-bold text-lg tracking-tight mb-12">
        trace
      </a>

      <div className="w-full max-w-sm">
        {/* Tabs */}
        <div className="flex border-b border-white/[0.06] mb-8">
          {(['login', 'signup'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 pb-3 text-xs font-medium transition-colors ${
                mode === m
                  ? 'text-white border-b border-white -mb-px'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {m === 'login' ? 'sign in' : 'create account'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-[11px] text-zinc-600 mb-1.5">email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#111] border border-white/[0.07] text-white text-xs px-3 py-2.5 rounded-sm placeholder:text-zinc-700 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] text-zinc-600 mb-1.5">password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#111] border border-white/[0.07] text-white text-xs px-3 py-2.5 pr-9 rounded-sm placeholder:text-zinc-700 focus:outline-none focus:border-white/20 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-zinc-400 transition-colors"
              >
                {showPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[11px] text-red-400 bg-red-950/30 border border-red-900/40 px-3 py-2 rounded-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold py-2.5 rounded-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {loading ? 'loading...' : mode === 'login' ? 'sign in' : 'create account'}
            {!loading && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </form>

        <p className="text-center text-[11px] text-zinc-700 mt-6">
          {mode === 'login' ? "don't have an account? " : 'already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            {mode === 'login' ? 'sign up' : 'sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
