import Link from "next/link";
import { SITE_NAME } from "@/content/company";
import { Container } from "./Container";

const NAV = [
  { href: "/products/", label: "Products" },
  { href: "/about/", label: "About" },
  { href: "/legal/", label: "Legal" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink hover:text-accent">
          {SITE_NAME}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-4 text-sm font-medium sm:gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
