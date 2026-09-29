import { STATUS_LABEL, type ProductStatus } from "@/content/products";

const STYLES: Record<ProductStatus, string> = {
  live: "bg-emerald-100 text-emerald-900",
  "in review": "bg-sky-100 text-sky-900",
  "coming soon": "bg-slate-200 text-slate-800",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
