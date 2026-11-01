"use client";

import { useState, type MouseEvent } from "react";
import { Check, Clock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/commerce/cart-provider";
import {
  getPrebookProduct,
  isProductPurchasable,
  type PrebookProductId,
} from "@/lib/commerce/products";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  productId: PrebookProductId;
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
  variant?: "gradient" | "solid" | "outline";
  label?: string;
};

export function AddToCartButton({
  productId,
  className,
  size = "default",
  variant = "gradient",
  label = "Book now",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const product = getPrebookProduct(productId);
  const purchasable = product ? isProductPurchasable(product) : false;

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!purchasable) return;
    addItem(productId);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  if (!purchasable) {
    return (
      <Button
        type="button"
        size={size}
        variant="outline"
        magnetic={false}
        disabled
        className={cn("w-full sm:w-auto cursor-not-allowed opacity-90", className)}
      >
        <Clock className="size-4" />
        Coming soon
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      magnetic={false}
      onClick={handleClick}
      className={cn("w-full sm:w-auto", className)}
    >
      {added ? (
        <>
          <Check className="size-4" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" />
          {label}
        </>
      )}
    </Button>
  );
}
