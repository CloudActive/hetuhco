import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { StatusBadge } from "@/components/StatusBadge";
import { StoreLinks } from "@/components/StoreLinks";
import { COMPANIES, OWNER } from "@/content/company";
import { getProduct, PRODUCTS } from "@/content/products";
import { legalLinksFor } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";
import { IS_REVIEW } from "@/lib/review";
import { T } from "@/lib/text";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMeta({
    title: p.displayName,
    description: `${p.tagline ? `${p.displayName}: ${p.tagline}` : `${p.displayName}.`} Owned by ${OWNER.legalName}.`,
    path: `/products/${p.slug}/`,
  });
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const site = product.website.replace(/^https?:\/\//, "");

  return (
    <Container className="py-12">
      <div className="flex flex-wrap items-start gap-5">
        <img src={product.iconPath} alt="" width={80} height={80} className="h-20 w-20 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{product.displayName}</h1>
            <StatusBadge status={product.status} />
          </div>
          {product.tagline && <p className="mt-2 text-lg text-muted"><T>{product.tagline}</T></p>}
          <p className="mt-2 text-sm">
            <a href={product.website} rel="noopener" className="text-accent hover:underline">{site}</a>
          </p>
        </div>
      </div>

      <div className="legal mt-8 max-w-3xl">
        <p><T>{product.description}</T></p>
        {product.status !== "live" && (
          <p className="text-muted">
            {product.displayName} is{" "}
            {product.status === "in review" ? "currently under review on the stores" : "not publicly released yet"}. Store
            links will appear here once the app is available.
          </p>
        )}
        <div className="mt-6"><StoreLinks product={product} /></div>

        <h2>Ownership and publishers</h2>
        <p>{product.displayName} is owned by {OWNER.legalName}.</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Store</th>
                <th scope="col">Publisher shown on the listing</th>
                <th scope="col">App ID</th>
              </tr>
            </thead>
            <tbody>
              {product.platforms.map((pl) => (
                <tr key={pl.store}>
                  <td>{pl.store}</td>
                  <td>
                    {COMPANIES[pl.publisher].legalName}
                    <span className="block text-muted">under licence from Hetuh S4H</span>
                  </td>
                  <td>{pl.packageId ?? pl.bundleId ?? "Not yet published"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Legal pages</h2>
        <p>
          The {product.displayName} privacy policy and other legal pages are published on {site}:
        </p>
        <ul>
          {legalLinksFor(product).map((l) => (
            <li key={l.key}><a href={l.url} rel="noopener">{product.displayName} {l.label}</a></li>
          ))}
        </ul>

        {IS_REVIEW && product.openQuestions.length > 0 && (
          <aside className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">Open questions for the owner (review build only)</p>
            <ul className="mt-2">{product.openQuestions.map((q) => <li key={q}>{q}</li>)}</ul>
          </aside>
        )}
      </div>
    </Container>
  );
}
