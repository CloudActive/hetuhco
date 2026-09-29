import Link from "next/link";
import { CompanyFacts } from "@/components/CompanyFacts";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CLOUDACTIVE, HETUH_LLC, OWNER } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { productPath } from "@/lib/legal";
import { listingsText } from "@/lib/publishers";
import { pageMeta } from "@/lib/meta";
import { T } from "@/lib/text";

export const metadata = pageMeta({
  title: "About",
  description:
    "Hetuh S4H Private Limited owns the triphetu™ and SahPath brands. How our apps are published.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <Container className="py-12">
      <PageHeader
        title="About Hetuh S4H"
        lede={`${OWNER.legalName} is a product company incorporated in India. We build consumer software and own the product brands listed on this site.`}
      />

      <section aria-labelledby="owner" className="legal">
        <h2 id="owner">Owner of the brands</h2>
        <p>
          {OWNER.legalName} owns all product brands, names, logos and software listed on this site, including{" "}
          {PRODUCTS.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && (i === PRODUCTS.length - 1 ? " and " : ", ")}
              <Link href={productPath(p)}>{p.displayName}</Link>
            </span>
          ))}
          . Product design, roadmap and brand decisions are made by Hetuh S4H.
        </p>
        <div className="mt-6 rounded-xl border border-line bg-surface p-6"><CompanyFacts /></div>
      </section>

      <section aria-labelledby="publishing" className="legal">
        <h2 id="publishing">How our products are published</h2>
        <p>
          Hetuh S4H does not publish apps on the stores itself. Each app is published under licence from Hetuh S4H by the
          company named on that store listing.
        </p>

        <h3>{CLOUDACTIVE.legalName}</h3>
        <p>
          {CLOUDACTIVE.legalName} (CIN {CLOUDACTIVE.cin}) is the licensed developer of our apps. Hetuh S4H and Cloudactive
          Labs are affiliated companies under common ownership.
          {listingsText("cloudactive") && <> It publishes {listingsText("cloudactive")} under licence from Hetuh S4H.</>}
        </p>
        <p>Registered office: {CLOUDACTIVE.addressLines.join(", ")}.</p>

        <h3>{HETUH_LLC.legalName}</h3>
        <p>
          {HETUH_LLC.legalName} is {HETUH_LLC.relationship}.
          {listingsText("hetuhLlc") && <> It publishes {listingsText("hetuhLlc")} under licence from Hetuh S4H.</>} Its own
          website is <a href={HETUH_LLC.website} rel="noopener">{HETUH_LLC.website}</a>.
        </p>
        <p>
          {HETUH_LLC.registration}. Address: {HETUH_LLC.addressLines.join(", ")}.
        </p>
      </section>

      <section aria-labelledby="products" className="legal">
        <h2 id="products">Products</h2>
        <ul>
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link href={productPath(p)}>{p.displayName}</Link>
              {p.tagline && <>: <T>{p.tagline}</T></>}
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
