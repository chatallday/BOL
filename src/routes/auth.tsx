import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

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
      alert("Incorrect password");
    }
  }

  return (
    <div style={{
      background: "red",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      position: "relative",
      zIndex: 50,
    }}>
      <form onSubmit={submit} style={{
        background: "blue",
        padding: "32px",
        borderRadius: "16px",
        maxWidth: "320px",
        width: "100%",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        pointerEvents: "auto",
      }}>
        <h1 style={{ color: "white", textAlign: "center", marginBottom: "16px", fontSize: "24px", fontWeight: "600" }}>
          Admin sign in
        </h1>
        <p style={{ color: "yellow", fontSize: "18px", fontWeight: "bold", textAlign: "center", margin: "16px 0" }}>
          DEBUG: {debug}
        </p>
        <input 
          name="password" 
          type="password" 
          required 
          minLength={8} 
          placeholder="Admin password" 
          autoComplete="current-password"
          onFocus={() => { console.log("[AUTH] focus"); setDebug("focused"); }}
          onChange={(e) => { console.log("[AUTH] change:", e.target.value.length); setDebug("typing:" + e.target.value.length); }}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
            marginBottom: "16px",
            background: "white",
            color: "black",
          }}
        />
        <button 
          disabled={busy} 
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.5 : 1,
          }}
        >
          {busy ? "…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}