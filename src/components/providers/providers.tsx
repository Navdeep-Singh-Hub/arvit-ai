import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CartProvider } from "@/components/commerce/cart-provider";
import { AudienceProvider } from "@/components/providers/audience-provider";
import { AudienceGate } from "@/components/audience/audience-gate";
import { AudienceRouteGuard } from "@/components/audience/audience-route-guard";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AudienceProvider>
        <CartProvider>
          <SmoothScrollProvider>
            <AudienceGate />
            <AudienceRouteGuard />
            {children}
          </SmoothScrollProvider>
        </CartProvider>
      </AudienceProvider>
    </ThemeProvider>
  );
}
