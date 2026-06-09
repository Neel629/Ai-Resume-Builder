"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Mail, Lock, ArrowRight, Eye, EyeOff, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Auto-redirect after a short delay if email confirmation is not required
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-jet relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-emerald/5 blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-[300px] h-[300px] rounded-full bg-emerald/3 blur-[100px]" />
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
            Start building today
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Create a professional resume in minutes. Free forever, no credit
            card required.
          </p>

          {/* Feature list */}
          <div className="mt-12 space-y-4">
            {[
              "4 professional templates",
              "Smart suggestions & ATS tips",
              "Instant PDF download",
              "Auto-save & cloud storage",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald" />
                <span className="text-white/70 text-sm">{feature}</span>
              </div>
            ))}
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

          {success ? (
            <div className="text-center animate-fade-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/10 text-emerald mx-auto mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-heading font-bold tracking-tight mb-3">
                Account created!
              </h1>
              <p className="text-muted-foreground mb-6">
                Redirecting you to your dashboard...
              </p>
              <div className="h-5 w-5 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-heading font-bold tracking-tight mb-2">
                Create your account
              </h1>
              <p className="text-muted-foreground mb-8">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-emerald hover:text-emerald-light transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>

              {/* Error */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="label-mono mb-2 block text-foreground"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                      required
                    />
                  </div>
                </div>

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
                      placeholder="Min. 6 characters"
                      className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                      required
                      minLength={6}
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
                      Create Account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-xs text-muted-foreground text-center">
                By creating an account, you agree to our terms of service.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
