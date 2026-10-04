import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
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
  const [debug, setDebug] = useState("mounting");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password"));
    setBusy(true);
    setDebug("submit:" + password.length);
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("bol_admin_auth", "true");
      setBusy(false);
      setDebug("success");
      nav({ to: "/admin" });
    } else {
      setBusy(false);
      setDebug("wrong:" + password);
      toast.error("Incorrect password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 relative z-50" style={{background:"red"}}>
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl bg-card p-8 shadow-xl pointer-events-auto" style={{background:"blue"}}>
        <div className="flex justify-center"><LogoMark className="h-14 w-14" /></div>
        <h1 className="text-center text-2xl font-semibold text-primary">Admin sign in</h1>
        <p className="text-center text-sm text-muted-foreground">Debug: {debug}</p>
        <input 
          name="password" 
          type="password" 
          required 
          minLength={8} 
          placeholder="Admin password" 
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          autoComplete="current-password"
          onFocus={() => setDebug("focused")}
          onChange={(e) => setDebug("typing:" + e.target.value.length)}
        />
        <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-50">
          {busy ? "…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}