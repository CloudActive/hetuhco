import { isLive, type Product } from "@/content/products";

/**
 * Sends visitors to the product's own download page, which lists every store.
 * Rendered only when the product is live and has a download page.
 */
export function DownloadButton({ product, size = "md" }: { product: Product; size?: "sm" | "md" }) {
  if (!isLive(product) || !product.downloadUrl) return null;
  const sizing = size === "sm" ? "px-3 py-1.5 text-sm" : "px-5 py-2.5 text-sm";
  return (
    <a
      href={product.downloadUrl}
      rel="noopener"
      className={`button inline-block rounded-lg bg-ink font-medium text-white no-underline hover:bg-accent ${sizing}`}
    >
      Download {product.displayName}
    </a>
  );
}
