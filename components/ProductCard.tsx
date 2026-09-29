import Link from "next/link";
import type { Product } from "@/content/products";
import { productPath } from "@/lib/legal";
import { T } from "@/lib/text";
import { StatusBadge } from "./StatusBadge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex gap-4 rounded-xl border border-line bg-surface p-5">
      <img src={product.iconPath} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-xl" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-ink">
            <Link href={productPath(product)} className="hover:text-accent">{product.displayName}</Link>
          </h3>
          <StatusBadge status={product.status} />
        </div>
        {product.tagline && <p className="mt-1 text-muted"><T>{product.tagline}</T></p>}
        <p className="mt-3 text-sm">
          <Link href={productPath(product)} className="font-medium text-accent hover:underline">
            About {product.displayName}
          </Link>
        </p>
      </div>
    </article>
  );
}
