import Link from "next/link";
import { SITE_NAME } from "@/content/company";
import { Container } from "./Container";
import { NavLink } from "./NavLink";

/** `match` lists the path prefixes that count as being inside each section. */
const NAV = [
  { href: "/products/", label: "Products", match: ["/products/"] },
  { href: "/about/", label: "About", match: ["/about/"] },
  { href: "/legal/", label: "Legal", match: ["/legal/", "/privacy/", "/terms/"] },
  { href: "/contact/", label: "Contact", match: ["/contact/", "/support/"] },
];

export function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 py-2 text-lg font-semibold tracking-tight text-ink hover:text-accent">
          {SITE_NAME}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-3 text-sm font-medium sm:gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
