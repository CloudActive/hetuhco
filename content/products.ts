import type { PublisherKey } from "./company";

/**
 * Single source of truth for products. Drives the product pages, the legal index, the sitemap and the footer.
 * Do not add a product without exact facts from the owner.
 *
 * Each product's privacy policy, terms and other legal pages live on the product's own website.
 * hetuh.co links to them; it does not host a second copy.
 */

export type ProductStatus = "live" | "in review" | "coming soon";
export type StoreName = "Google Play" | "App Store";

export interface Platform {
  store: StoreName;
  /** Legal entity shown as the developer/seller on that store listing. */
  publisher: PublisherKey;
  packageId?: string;
  bundleId?: string;
}

export type LegalKey = "privacy" | "terms" | "support" | "delete-account" | "child-safety" | "ownership";

export interface Product {
  slug: string;
  /** Plain name used in sentences and titles. */
  name: string;
  /** Name with trademark symbol where one applies. */
  displayName: string;
  /** Optional one-liner. Omit it and nothing is shown. */
  tagline?: string;
  description: string;
  status: ProductStatus;
  website: string;
  /**
   * The product's own download page, which links to every store listing. hetuh.co sends visitors there
   * instead of linking each store directly. Shown only when status is "live".
   */
  downloadUrl?: string;
  iconPath: string;
  platforms: Platform[];
  /**
   * Public legal pages on the product's own website. List only URLs that load without signing in;
   * anything missing here is simply not linked.
   */
  legalLinks: Partial<Record<LegalKey, string>>;
  /** Open questions for the owner, shown only in review builds. */
  openQuestions: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "triphetu",
    name: "triphetu",
    displayName: "triphetu™",
    tagline: "Plan trips together.",
    description:
      "triphetu is a group trip planner. Plan trips together, share itineraries, coordinate the group and split expenses in one place. Everyone on the trip sees the same plan, so nothing gets lost in chat threads.",
    status: "live",
    website: "https://triphetu.com",
    downloadUrl: "https://triphetu.com/download",
    iconPath: "/products/triphetu.png",
    // Both listings are published by Hetuh LLC (App Store seller HETUH LLC, checked 2 Nov 2026).
    platforms: [
      { store: "Google Play", publisher: "hetuhLlc", packageId: "com.triphetu.app" },
      { store: "App Store", publisher: "hetuhLlc", bundleId: "com.triphetu.app" },
    ],
    legalLinks: {
      privacy: "https://triphetu.com/privacy",
      terms: "https://triphetu.com/terms",
      support: "https://triphetu.com/support",
      "delete-account": "https://triphetu.com/delete-account",
      ownership: "https://triphetu.com/legal",
    },
    openQuestions: [
      "triphetu.com/child-safety redirects to app.triphetu.com/child-safety, which returns 404. Google Play needs a public child safety standards page for apps with social features. Add it to legalLinks once it loads.",
      "triphetu.com/privacy does not name a Grievance Officer (hetuh.co names Suraj Singh).",
      "triphetu.com/privacy and triphetu.com/legal still name Cloudactive Labs as the Android publisher. Update them to Hetuh LLC as publisher and Cloudactive Labs as developer.",
    ],
  },
  {
    slug: "sahpath",
    name: "SahPath",
    displayName: "SahPath",
    description:
      "SahPath is a tool for synchronised group recitation. One person leads a reading and every other participant's screen follows in real time.",
    status: "live",
    website: "https://sahpath.app",
    downloadUrl: "https://sahpath.app/download",
    iconPath: "/products/sahpath.png",
    // Both listings are published by Hetuh LLC (App Store seller HETUH LLC, checked 2 Nov 2026).
    platforms: [
      { store: "Google Play", publisher: "hetuhLlc", packageId: "com.sahpath.app" },
      { store: "App Store", publisher: "hetuhLlc", bundleId: "com.sahpath.app" },
    ],
    legalLinks: {
      privacy: "https://sahpath.app/privacy",
      support: "https://sahpath.app/support",
      "delete-account": "https://sahpath.app/delete-account",
      ownership: "https://sahpath.app/legal",
    },
    openQuestions: [
      "sahpath.app/terms and sahpath.app/child-safety redirect to a login page. Store reviewers need them public; they are not linked from hetuh.co until they are.",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function isLive(p: Product): boolean {
  return p.status === "live";
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Available now",
  "in review": "In review",
  "coming soon": "Coming soon",
};
