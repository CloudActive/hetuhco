/**
 * Single source of truth for company facts, publishers and contact addresses.
 * Every page and legal document reads from here. Change an address once and it changes everywhere.
 *
 * Text containing "[CONFIRM: …]" is a draft claim that must be confirmed before launch.
 * The production build fails while any such marker is still rendered (see scripts/check-confirms.mjs).
 */

export const SITE_URL = "https://hetuh.co";
export const SITE_NAME = "Hetuh S4H";

/**
 * Email addresses shown on the site. Never render these as text or mailto links: pages show them through the
 * <Email k="…" /> sprite so crawlers cannot scrape them. After changing an address, regenerate the sprite with
 * `python scripts/make_email_sprite.py`. The production build fails if an address appears in the HTML.
 */
export const EMAILS = {
  legal: "legal@hetuh.co",
  privacy: "privacy@hetuh.co",
  support: "support@hetuh.co",
} as const;


export type PublisherKey = "hetuhS4H" | "cloudactive" | "hetuhLlc";

export interface Company {
  key: PublisherKey;
  legalName: string;
  shortName: string;
  cin?: string;
  addressLines: string[];
  country: string;
  website?: string;
  /** Registration detail for companies without a CIN, e.g. a US state filing. */
  registration?: string;
  /** Sentence fragment describing the relationship to Hetuh S4H. */
  relationship: string;
  /** Sentence fragment describing the publishing role. */
  role: string;
}

export const OWNER: Company & { director: string } = {
  key: "hetuhS4H",
  legalName: "Hetuh S4H Private Limited",
  shortName: "Hetuh S4H",
  cin: "U70200UP2025PTC234812",
  addressLines: [
    "2231, Tower B, Bhutani Alphathum",
    "Sector 90, Noida",
    "Gautam Buddha Nagar, Uttar Pradesh – 201301",
    "India",
  ],
  country: "India",
  website: SITE_URL,
  director: "Gautam Singh",
  relationship: "the owner of all product brands listed on this site",
  role: "brand owner and licensor",
};

export const CLOUDACTIVE: Company = {
  key: "cloudactive",
  legalName: "Cloudactive Labs (India) Private Limited",
  shortName: "Cloudactive Labs",
  cin: "U72900PN2017PTC169885",
  addressLines: [
    "BL 29, Sr. No. 405, Sharad Society",
    "Shivaji Nagar, Pune",
    "Maharashtra – 411016",
    "India",
  ],
  country: "India",
  relationship: "an affiliated company under common ownership with Hetuh S4H Private Limited",
  role: "licensed developer and publisher, under licence from Hetuh S4H Private Limited",
};

export const HETUH_LLC: Company = {
  key: "hetuhLlc",
  legalName: "Hetuh LLC",
  shortName: "Hetuh LLC",
  // Address from hetuh-1pager commit e04af39 (former hetuh.co site). Registered in Texas, confirmed by the owner.
  addressLines: ["8787 N MacArthur Blvd Ste 120A", "Irving, Texas 75063-5406", "United States"],
  country: "United States",
  website: "https://hetuhai.com",
  // As published on sahpath.app/legal.
  registration: "Texas limited liability company, file number 805742743",
  relationship:
    "an independent company registered in Texas, United States. It is not owned or controlled by Hetuh S4H Private Limited, and Hetuh S4H Private Limited is not owned or controlled by it",
  role: "licensed publisher, under licence from Hetuh S4H Private Limited",
};

export const COMPANIES: Record<PublisherKey, Company> = {
  hetuhS4H: OWNER,
  cloudactive: CLOUDACTIVE,
  hetuhLlc: HETUH_LLC,
};

export interface Trademark {
  /** Matches the product slug it belongs to, if any. */
  mark: string;
  /** How the mark is rendered in text. Use ™ only; never ® until registration is granted. */
  display: string;
  applicationNo: string;
  classes: string;
  jurisdiction: string;
}

/**
 * Trademarks owned by Hetuh S4H Private Limited. Add every mark here; the legal index,
 * company facts and terms pages list them all. Only marks confirmed by the owner are included.
 */
export const TRADEMARKS: Trademark[] = [
  {
    mark: "triphetu",
    display: "triphetu™",
    applicationNo: "8026781",
    classes: "9 and 42",
    jurisdiction: "India",
  },
];

export function trademarkFor(slug: string): Trademark | undefined {
  return TRADEMARKS.find((t) => t.mark === slug);
}

export const GRIEVANCE_OFFICER = {
  name: "Suraj Singh",
  email: EMAILS.privacy,
  addressLines: OWNER.addressLines,
  responseTime: "within 30 days of receipt",
} as const;


export const LEGAL_DEFAULTS = {
  /** Shown as "Last updated" on every legal page. ISO date. */
  lastUpdated: "2026-09-28",
  governingLaw: "the laws of India",
  /** Set a specific seat (e.g. "the courts at Noida, India") once decided. */
  courts: "the competent courts in India",
  /** Matches the product policies on triphetu.com and sahpath.app. */
  minimumAge: "13",
  supportResponseTime: "within 2 business days",
} as const;

export const COPYRIGHT_LINE = "© 2026 Hetuh S4H Private Limited. All rights reserved.";
export const FOOTER_IDENTITY_LINE = `${OWNER.legalName} · CIN ${OWNER.cin} · Noida, India`;

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
