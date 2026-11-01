import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CartProvider } from "@/components/commerce/cart-provider";
import { AudienceProvider } from "@/components/providers/audience-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AudienceProvider>
        <CartProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </CartProvider>
      </AudienceProvider>
    </ThemeProvider>
  );
}
