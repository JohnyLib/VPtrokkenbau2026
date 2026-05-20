"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabasePublic } from '../../../lib/supabase';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  // Parse errors from the query string (if any redirect issues occur)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errType = params.get('error');
    if (errType) {
      setTimeout(() => {
        if (errType === 'email_not_whitelisted') {
          setError('Diese Gmail-Adresse ist nicht für das Admin-Dashboard autorisiert (keine Berechtigung).');
        } else if (errType === 'auth_failed') {
          setError('Die Authentifizierung über Google/Gmail ist fehlgeschlagen.');
        }
      }, 0);
    }
  }, []);

  // Set up the client-side Supabase session observer
  useEffect(() => {
    const { data: { subscription } } = supabasePublic.auth.onAuthStateChange(async (event, session) => {
      // Catch sign-in state parsed from the URL hash parameter (#access_token=...)
      if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session) {
        setIsGoogleLoading(true);
        setError('');
        try {
          const email = session.user?.email;
          if (!email) throw new Error('Keine E-Mail-Adresse von Google erhalten.');

          // Handshake token to check the whitelist and issue the secure administration cookie
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, oauth_token: session.access_token }),
          });

          const data = await res.json();
          if (res.ok && data.success) {
            // Clean client-side state by logging out of Supabase (secure cookie manages dashboard access)
            await supabasePublic.auth.signOut();
            router.push('/admin');
            router.refresh();
          } else {
            setError(data.error || 'Diese E-Mail-Adresse ist nicht autorisiert.');
            await supabasePublic.auth.signOut();
          }
        } catch (err: any) {
          console.error('Google verification error:', err);
          setError(err.message || 'Die Verifizierung Ihrer Gmail-Sitzung ist fehlgeschlagen.');
          await supabasePublic.auth.signOut();
        } finally {
          setIsGoogleLoading(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Bitte füllen Sie alle Felder aus.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ein Verbindungsfehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const { error } = await supabasePublic.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redirect straight back to /admin/login to capture the #access_token cleanly
          redirectTo: `${window.location.origin}/admin/login`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      console.error('Google Auth redirect error:', err);
      setError(err.message || 'Google OAuth-Verbindung konnte nicht aufgebaut werden.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#fbf8fa]">
      <div className="w-full max-w-md bg-white border-4 border-[#091426] shadow-[10px_10px_0px_0px_#091426] p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#2563eb]">
        {/* Accent strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#2563eb]" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#091426] uppercase tracking-tight">
            VP<span className="text-[#2563eb]">Trockenbau</span>
          </h1>
          <p className="text-xs font-bold text-[#45474c] uppercase tracking-widest mt-1">
            Admin Kontrollzentrum
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-[#ffefef] border-2 border-red-600 text-red-800 p-4 font-bold text-sm flex items-start gap-2 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
            <span className="shrink-0 text-lg">⚠️</span>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#091426] uppercase tracking-wider" htmlFor="username">
              Benutzername
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#091426]">
                <User className="w-5 h-5" />
              </div>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="z.B. admin"
                className="w-full pl-11 pr-4 py-3 bg-[#f5f3f4] border-2 border-[#091426] outline-none font-medium focus:bg-white focus:ring-4 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#091426] uppercase tracking-wider" htmlFor="password">
              Passwort
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#091426]">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-[#f5f3f4] border-2 border-[#091426] outline-none font-medium focus:bg-white focus:ring-4 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#091426] hover:text-[#2563eb] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="mt-2 bg-[#1e293b] hover:bg-[#2563eb] text-white font-extrabold uppercase py-4 border-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:shadow-[4px_4px_0px_0px_#091426] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer text-center text-sm tracking-wider flex items-center justify-center gap-2 min-h-[56px] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Anmelden...
              </>
            ) : (
              'Einloggen'
            )}
          </button>
        </form>

        {/* Custom Neo-Brutalist Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#091426]/20"></div>
          </div>
          <span className="relative bg-white px-4 text-xs font-black uppercase text-[#45474c] tracking-widest">
            ODER
          </span>
        </div>

        {/* Google OAuth Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || isGoogleLoading}
          className="w-full bg-white hover:bg-[#fbf8fa] text-[#091426] font-extrabold uppercase py-3.5 border-2 border-[#091426] shadow-[4px_4px_0px_0px_#2563eb] hover:shadow-[4px_4px_0px_0px_#091426] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all duration-200 cursor-pointer text-center text-xs tracking-wider flex items-center justify-center gap-3 disabled:opacity-50 min-h-[52px]"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#2563eb]" />
          ) : (
            <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Mit Gmail einloggen</span>
        </button>

        <div className="mt-8 text-center border-t border-[#091426]/10 pt-4">
          <p className="text-xs font-semibold text-[#45474c]">
            VP<span className="text-[#2563eb]">Trockenbau</span> Handwerker-Portal Dresden
          </p>
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
