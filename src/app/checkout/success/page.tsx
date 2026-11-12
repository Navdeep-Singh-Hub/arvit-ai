import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{ id?: string; paid?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { id, paid } = await searchParams;
  const isPaid = paid === "1";

  return (
    <section className="section-pad pt-36 sm:pt-40">
      <Container size="narrow" className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {isPaid ? "Payment received — thank you!" : "Booking received"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {isPaid
            ? "Your AAC Device is confirmed. Our team will call you shortly to arrange delivery and help you get started."
            : "Thanks — our team will call you shortly to confirm payment and delivery for your AAC Device."}
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
      </Container>
    </section>
  );
}
