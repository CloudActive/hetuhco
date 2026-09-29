import Link from "next/link";
import { COPYRIGHT_LINE, EMAILS, FOOTER_IDENTITY_LINE } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { legalLinksFor, productPath } from "@/lib/legal";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface text-sm">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="mb-3 font-semibold text-ink">Company</h2>
            <ul className="space-y-2">
              <li><Link className="text-muted hover:text-ink" href="/about/">About</Link></li>
              <li><Link className="text-muted hover:text-ink" href="/contact/">Contact</Link></li>
              <li><Link className="text-muted hover:text-ink" href="/legal/">Legal</Link></li>
              <li><Link className="text-muted hover:text-ink" href="/privacy/">Privacy Policy</Link></li>
              <li><Link className="text-muted hover:text-ink" href="/terms/">Terms of Use</Link></li>
              <li><Link className="text-muted hover:text-ink" href="/support/">Support</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-semibold text-ink">Products</h2>
            <ul className="space-y-2">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link className="text-muted hover:text-ink" href={productPath(p)}>{p.displayName}</Link>
                  {legalLinksFor(p)
                    .filter((l) => l.key === "privacy" || l.key === "terms")
                    .map((l) => (
                      <span key={l.key}>
                        <span className="text-muted" aria-hidden="true"> · </span>
                        <a className="text-muted hover:text-ink" href={l.url} rel="noopener">{l.label}</a>
                      </span>
                    ))}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-semibold text-ink">Contact</h2>
            <ul className="space-y-2">
              <li><a className="text-muted hover:text-ink" href={`mailto:${EMAILS.support}`}>{EMAILS.support}</a></li>
              <li><a className="text-muted hover:text-ink" href={`mailto:${EMAILS.privacy}`}>{EMAILS.privacy}</a></li>
              <li><a className="text-muted hover:text-ink" href={`mailto:${EMAILS.legal}`}>{EMAILS.legal}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6 text-muted">
          <p>{FOOTER_IDENTITY_LINE}</p>
          <p className="mt-1">{COPYRIGHT_LINE}</p>
        </div>
      </Container>
    </footer>
  );
}
