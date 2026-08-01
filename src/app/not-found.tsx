import { Home, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AuroraBackground } from "@/components/backgrounds/aurora-background";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32">
      <AuroraBackground variant="subtle" />
      <Container className="relative text-center">
        <p className="text-gradient text-7xl font-bold tracking-tight sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-semibold text-foreground sm:text-3xl">This page took a different path</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/" variant="gradient" size="lg">
            <Home className="size-4" />
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact Us
            <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
