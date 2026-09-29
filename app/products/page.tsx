import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { OWNER } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Products",
  description: "Consumer apps owned by Hetuh S4H Private Limited.",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <Container className="py-12">
      <PageHeader title="Products" lede={`Consumer apps owned by ${OWNER.legalName}.`} />
      <div className="grid gap-4 sm:grid-cols-2">
        {PRODUCTS.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </Container>
  );
}
