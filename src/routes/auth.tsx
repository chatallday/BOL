import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { LogoMark } from "@/components/SiteLayout";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign in — Breath of Life PDC" },
      { name: "description", content: "Sign in to manage the Breath of Life PDC website." },
      { property: "og:title", content: "Admin sign in — Breath of Life PDC" },
      { property: "og:description", content: "Admin area." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "boladmin2026";

function AuthPage() {
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password"));
    setError("");
    setBusy(true);
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("bol_admin_auth", "true");
      setBusy(false);
      nav({ to: "/admin" });
    } else {
      setBusy(false);
      setError("Incorrect password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-6 rounded-2xl bg-card p-8 shadow-xl">
        <div className="flex justify-center">
          <LogoMark className="h-14 w-14" />
        </div>
        <h1 className="text-center text-2xl font-semibold text-primary">Admin sign in</h1>
        {error && (
          <p className="text-center text-sm text-destructive" role="alert">{error}</p>
        )}
        <input
          ref={inputRef}
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Admin password"
          autoComplete="current-password"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          autoComplete="current-password"
          disabled={busy}
        />
        <button
          disabled={busy}
          type="submit"
          className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}