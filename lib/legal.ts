import type { LegalKey, Product } from "@/content/products";

export const LEGAL_LABELS: Record<LegalKey, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  support: "Support",
  "delete-account": "Delete Account",
  "child-safety": "Child Safety Standards",
  ownership: "Ownership & Licensing",
};

const ORDER: LegalKey[] = ["privacy", "terms", "support", "delete-account", "child-safety", "ownership"];

export interface LegalLink {
  key: LegalKey;
  label: string;
  /** Absolute URL on the product's own website. */
  url: string;
}

/** The product's legal pages, in a fixed order, only those that exist. */
export function legalLinksFor(product: Product): LegalLink[] {
  return ORDER.flatMap((key) => {
    const url = product.legalLinks[key];
    return url ? [{ key, label: LEGAL_LABELS[key], url }] : [];
  });
}

export function legalLink(product: Product, key: LegalKey): LegalLink | undefined {
  return legalLinksFor(product).find((l) => l.key === key);
}

export function productPath(product: Product): string {
  return `/products/${product.slug}/`;
}
