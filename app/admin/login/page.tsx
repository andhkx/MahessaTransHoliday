'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAElc0pMsz_IJ6dhA';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const captchaRef = useRef<TurnstileInstance>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setError('Selesaikan verifikasi captcha terlebih dahulu.');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });

    if (error) {
      setError(error.message);
      captchaRef.current?.reset();
      setCaptchaToken(null);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-line shadow-card p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">Admin Login</h1>
            <p className="mt-2 text-sm text-muted">Masuk ke dashboard Mahessa Trans Holiday</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-[0.16em]">
              <ShieldCheck size={12} strokeWidth={2} />
              Protected by Turnstile
            </div>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
                  placeholder="admin@mahessatransholiday.web.id"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <Turnstile
                ref={captchaRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setCaptchaToken(token)}
                onError={() => setCaptchaToken(null)}
                onExpire={() => setCaptchaToken(null)}
                options={{
                  theme: 'light',
                  appearance: 'always',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !captchaToken}
              className="w-full bg-accent text-white py-3 rounded-xl font-extrabold hover:bg-accent-hover transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted">
              <Link href="/" className="text-accent hover:underline">← Kembali ke Website</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted mt-4">
          Mahessa Trans Holiday &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}