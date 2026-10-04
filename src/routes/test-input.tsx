import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test-input")({
  head: () => ({
    meta: [
      { title: "Input Test — Breath of Life PDC" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestInput,
});

function TestInput() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm space-y-4 rounded-3xl bg-card p-8 shadow-xl">
        <h1 className="text-center text-2xl font-semibold text-primary">Input Test</h1>
        <form onSubmit={(e) => { e.preventDefault(); alert("Submitted: " + new FormData(e.currentTarget).get("password")); }}>
          <input 
            name="password" 
            type="password" 
            required 
            minLength={8} 
            placeholder="Test password" 
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            autoComplete="current-password"
          />
          <button type="submit" className="mt-4 w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">
            Test Submit
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          This page tests native input without router navigation
        </p>
      </div>
    </div>
  );
}