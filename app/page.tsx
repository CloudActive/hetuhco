import Link from "next/link";
import { CompanyFacts } from "@/components/CompanyFacts";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { OWNER } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Hetuh S4H Private Limited",
  description:
    "Hetuh S4H Private Limited is an Indian product company building consumer software. Owner of the triphetu™ and SahPath brands.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Hetuh S4H Private Limited</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            A product company building consumer software.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            We design and own consumer apps that help people organise the things they do together. {OWNER.legalName} is the
            owner of every product brand on this site. Our apps are published on the app stores under licence by the
            publisher named on each store listing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products/" className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-accent">
              Our products
            </Link>
            <Link href="/about/" className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink hover:border-ink">
              About the company
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="products-heading">
        <Container className="py-14">
          <h2 id="products-heading" className="text-2xl font-semibold tracking-tight text-ink">Products</h2>
          <p className="mt-2 text-muted">Brands owned by {OWNER.legalName}.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </Container>
      </section>

      <section aria-labelledby="facts-heading" className="border-t border-line bg-surface">
        <Container className="py-14">
          <h2 id="facts-heading" className="text-2xl font-semibold tracking-tight text-ink">Company facts</h2>
          <div className="mt-6"><CompanyFacts /></div>
          <p className="mt-6 text-sm text-muted">
            See <Link href="/about/" className="text-accent hover:underline">About</Link> for how our products are published and{" "}
            <Link href="/legal/" className="text-accent hover:underline">Legal</Link> for every privacy policy and terms page.
          </p>
        </Container>
      </section>
    </>
  );
}
