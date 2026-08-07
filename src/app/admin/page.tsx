"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch("/api/admin/bookings");
        if (res.ok && !cancelled) {
          router.replace("/admin/bookings");
          return;
        }
      } catch {
        // stay on login
      }
      if (!cancelled) setChecking(false);
    }
    void check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.push("/admin/bookings");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setSubmitting(false);
    }
  }

  if (checking) {
    return (
      <section className="section-pad pt-28 sm:pt-32">
        <Container size="narrow" className="text-center text-muted-foreground">
          Checking session…
        </Container>
      </section>
    );
  }

  return (
    <section className="section-pad pt-28 sm:pt-32">
      <Container size="narrow">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card/70 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-brand-primary uppercase">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            View and manage AAC / Therapy app pre-bookings.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" variant="gradient" className="w-full" disabled={submitting} magnetic={false}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
