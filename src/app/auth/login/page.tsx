"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FileText, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-jet relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-[400px] h-[400px] rounded-full bg-emerald/5 blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-[300px] h-[300px] rounded-full bg-emerald/3 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-md px-12">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald text-white">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-2xl font-heading font-semibold text-white tracking-tight">
              Resume<span className="text-emerald-light">Forge</span>
            </span>
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-4 tracking-tight">
            Welcome back
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Continue building your professional resume. Your progress is saved
            automatically.
          </p>

          {/* Fake resume preview */}
          <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-emerald/20" />
              <div>
                <div className="h-2.5 w-20 rounded-full bg-white/20 mb-1.5" />
                <div className="h-2 w-14 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="space-y-2">
              {[85, 72, 90, 60, 78].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full bg-white/[0.06]"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-lg font-heading font-semibold tracking-tight">
              Resume<span className="text-emerald">Forge</span>
            </span>
          </div>

          <h1 className="text-2xl font-heading font-bold tracking-tight mb-2">
            Sign in to your account
          </h1>
          <p className="text-muted-foreground mb-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-emerald hover:text-emerald-light transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="label-mono mb-2 block text-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="label-mono mb-2 block text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald text-white font-medium hover:bg-emerald-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald/20"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="h-8 w-8 border-4 border-emerald/30 border-t-emerald rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
