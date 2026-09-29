import type { Metadata } from "next";
import { SITE_NAME } from "@/content/company";

interface PageMetaInput {
  title: string;
  description: string;
  /** Site-relative path with trailing slash. */
  path: string;
}

/** Per-page title, description, canonical and Open Graph. metadataBase is set in app/layout.tsx. */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = path === "/" ? title : `${title} · ${SITE_NAME}`;
  const cleanDescription = description.replace(/\[CONFIRM:[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
  return {
    title: { absolute: fullTitle },
    description: cleanDescription,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description: cleanDescription, url: path, siteName: SITE_NAME, type: "website" },
    twitter: { card: "summary", title: fullTitle, description: cleanDescription },
  };
}
