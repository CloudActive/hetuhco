import Link from "next/link";
import { Container } from "@/components/Container";
import { Email } from "@/components/Email";
import { PageHeader } from "@/components/PageHeader";
import { LEGAL_DEFAULTS, OWNER } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { legalLinksFor } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";
import { T } from "@/lib/text";

export const metadata = pageMeta({
  title: "Support",
  description: "Support for every Hetuh S4H app. Email our support team or open the support page for your product.",
  path: "/support/",
});

export default function CompanySupportPage() {
  return (
    <Container className="py-12">
      <PageHeader title="Support" lede={`Help with any app owned by ${OWNER.legalName}.`} />

      <div className="rounded-xl border border-line bg-surface p-6">
        <h2 className="font-semibold text-ink">Email us</h2>
        <p className="mt-2"><Email k="support" /></p>
        <p className="mt-2 text-muted">
          Tell us which app you are using, the app version, your device and operating system version, and what happened.
        </p>
        <p className="mt-2 text-sm text-muted"><T>{`We aim to respond ${LEGAL_DEFAULTS.supportResponseTime}.`}</T></p>
      </div>

      <section className="mt-10" aria-labelledby="by-product">
        <h2 id="by-product" className="text-2xl font-semibold tracking-tight text-ink">Support by product</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => {
            const pages = legalLinksFor(p);
            return (
              <div key={p.slug} className="rounded-xl border border-line bg-surface p-5">
                <h3 className="font-semibold text-ink">{p.displayName}</h3>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {pages.map((l) => (
                    <li key={l.key}><a href={l.url} rel="noopener" className="text-accent hover:underline">{l.label}</a></li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="legal mt-10 max-w-3xl" aria-labelledby="other">
        <h2 id="other">Other requests</h2>
        <ul>
          <li>Privacy requests and grievances: <Email k="privacy" /> (see the <Link href="/privacy/">Privacy Policy</Link> for the Grievance Officer).</li>
          <li>Legal notices, trademark and licensing: <Email k="legal" /></li>
          <li>Postal address: {OWNER.legalName}, {OWNER.addressLines.join(", ")}.</li>
        </ul>
      </section>
    </Container>
  );
}
