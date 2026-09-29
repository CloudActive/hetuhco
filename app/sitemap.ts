import type { MetadataRoute } from "next";
import { LEGAL_DEFAULTS, SITE_URL } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { productPath } from "@/lib/legal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LEGAL_DEFAULTS.lastUpdated);
  const staticPaths = ["/", "/products/", "/about/", "/contact/", "/legal/", "/privacy/", "/terms/", "/support/"];
  const productPaths = PRODUCTS.map(productPath);
  return [...staticPaths, ...productPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products/") ? 0.8 : 0.6,
  }));
}
