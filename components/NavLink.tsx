"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Header link that marks itself as the current section (aria-current + visual state). */
export function NavLink({ href, label, match }: { href: string; label: string; match: string[] }) {
  const pathname = usePathname() ?? "/";
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const active = match.some((m) => path.startsWith(m));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-block py-2 ${
        active ? "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-8" : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
