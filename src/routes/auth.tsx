import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
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
  const [showPassword, setShowPassword] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password"));
    setBusy(true);
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("bol_admin_auth", "true");
      setBusy(false);
      nav({ to: "/admin" });
    } else {
      setBusy(false);
      toast.error("Incorrect password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl bg-card p-8 shadow-xl">
        <div className="flex justify-center"><LogoMark className="h-14 w-14" /></div>
        <h1 className="text-center text-2xl font-semibold text-primary">Admin sign in</h1>
        <div className="relative">
          <Input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            required 
            minLength={8} 
            placeholder="Admin password" 
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁" : "👁‍🗨"}
          </button>
        </div>
        <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-50">
          {busy ? "…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}