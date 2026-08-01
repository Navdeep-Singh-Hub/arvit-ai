"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ROLES = [
  "Parent (Therapy Tablet)",
  "Adult / Caregiver (AAC Tablet)",
  "Therapist",
  "School or Clinic",
  "Hospital / Health System",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      role: String(data.get("role") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="card-glow flex h-full flex-col items-center justify-center gap-3 rounded-3xl p-10 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">Message received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out — our team will get back to you within one business day.
        </p>
        <Button variant="outline" size="sm" magnetic={false} onClick={() => setStatus("idle")} className="mt-2">
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-glow rounded-3xl p-7 sm:p-9" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" type="text" autoComplete="name" placeholder="Jordan Rivera" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="role">I am a...</Label>
        <select
          id="role"
          name="role"
          defaultValue=""
          className="flex h-12 w-full rounded-xl border border-input bg-white px-4 text-base text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-250 focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/20 dark:bg-card"
        >
          <option value="" disabled>
            Select one
          </option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" name="message" placeholder="Tell us a bit about your needs..." required rows={5} />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex items-center gap-2 overflow-hidden rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="size-4 shrink-0" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="mt-7 w-full justify-center sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
