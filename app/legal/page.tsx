import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { OWNER, TRADEMARKS } from "@/content/company";
import { publisherSentences } from "@/lib/publishers";
import { PRODUCTS } from "@/content/products";
import { legalLinksFor, productPath } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Legal",
  description:
    "Privacy policies, terms of use, support, account deletion and child safety pages for every Hetuh S4H product, plus brand ownership and trademark notice.",
  path: "/legal/",
});

export default function LegalIndexPage() {
  return (
    <Container className="py-12">
      <PageHeader title="Legal" lede="Every legal page for every product, and who owns what." />

      <section aria-labelledby="company" className="mb-12">
        <h2 id="company" className="text-2xl font-semibold tracking-tight text-ink">Hetuh S4H company pages</h2>
        <p className="mt-2 text-muted">General policies of {OWNER.legalName}, covering hetuh.co and all of our apps.</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li><Link href="/privacy/" className="text-accent hover:underline">Privacy Policy</Link></li>
          <li><Link href="/terms/" className="text-accent hover:underline">Terms of Use</Link></li>
          <li><Link href="/support/" className="text-accent hover:underline">Support</Link></li>
        </ul>
      </section>

      <section aria-labelledby="pages">
        <h2 id="pages" className="text-2xl font-semibold tracking-tight text-ink">Legal pages by product</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <div key={p.slug} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-semibold text-ink">
                <Link href={productPath(p)} className="hover:text-accent">{p.displayName}</Link>
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {legalLinksFor(p).map((l) => (
                  <li key={l.key}><a href={l.url} rel="noopener" className="text-accent hover:underline">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="ownership" className="legal">
        <h2 id="ownership">Brand ownership</h2>
        <p>
          All product brands, names, logos and software on this site are owned by {OWNER.legalName} (CIN {OWNER.cin}),{" "}
          {OWNER.addressLines.join(", ")}.
        </p>
        {publisherSentences().map((s) => <p key={s}>{s}</p>)}
      </section>

      <section aria-labelledby="trademarks" className="legal">
        <h2 id="trademarks">Trademarks</h2>
        <p>
          The product names and logos on this site are trademarks of {OWNER.legalName}, whether or not they are marked with
          the ™ symbol. Applications and registrations include:
        </p>
        <ul>
          {TRADEMARKS.map((t) => (
            <li key={t.mark}>
              {t.display}: {t.jurisdiction === "India" ? "Indian" : t.jurisdiction} trademark application no. {t.applicationNo}{" "}
              (classes {t.classes}), filed {t.filedOn}.
            </li>
          ))}
        </ul>
        <p>
          You may not use our trademarks without the prior written permission of {OWNER.legalName}. Other names and logos may
          be trademarks of their respective owners.
        </p>
      </section>
    </Container>
  );
}
