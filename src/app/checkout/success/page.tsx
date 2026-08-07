import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { id } = await searchParams;

  return (
    <section className="section-pad pt-28 sm:pt-32">
      <Container size="narrow" className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Pre-booking received
        </h1>
        <p className="mt-3 text-muted-foreground">
          Thanks — our team will follow up by email to confirm your AAC App and/or AAC + Therapy Progress
          App reservation.
        </p>
        {id ? (
          <p className="mt-4 rounded-2xl bg-muted/60 px-4 py-3 text-sm text-foreground">
            Reference ID: <span className="font-mono font-semibold">{id}</span>
          </p>
        ) : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="gradient">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" magnetic={false}>
            Contact support
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Admin?{" "}
          <Link href="/admin" className="font-medium text-brand-primary hover:underline">
            View bookings
          </Link>
        </p>
      </Container>
    </section>
  );
}
