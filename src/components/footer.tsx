import Link from "next/link";
import { FileText, GitFork, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center">
              <img src="/logo.png" alt="Resume Forge Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-heading font-semibold tracking-tight">
              Resume<span className="text-emerald">Forge</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/Neel629/Ai-Resume-Builder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <GitFork className="h-3.5 w-3.5" />
              GitFork
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-emerald fill-emerald" /> by
            Neel Prajapati
          </p>
        </div>
      </div>
    </footer>
  );
}
