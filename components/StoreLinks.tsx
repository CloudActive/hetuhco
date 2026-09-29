import { COMPANIES } from "@/content/company";
import { isLive, type Product } from "@/content/products";

/** Store links are rendered only when the product is live AND the listing URL is known. */
export function StoreLinks({ product }: { product: Product }) {
  const live = product.platforms.filter((p) => isLive(product) && p.storeUrl);
  if (live.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-3">
      {live.map((p) => (
        <li key={p.store}>
          <a
            href={p.storeUrl ?? undefined}
            className="inline-block rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-accent"
            rel="noopener"
          >
            Get it on {p.store}
          </a>
          <span className="sr-only"> (published by {COMPANIES[p.publisher].legalName})</span>
        </li>
      ))}
    </ul>
  );
}
