import { CLOUDACTIVE, HETUH_LLC, OWNER, type Company, type PublisherKey } from "@/content/company";
import { PRODUCTS } from "@/content/products";

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function storeLabel(store: string): string {
  return store === "App Store" ? "the Apple App Store" : "Google Play";
}

/**
 * What a publisher publishes, derived from content/products.ts,
 * e.g. "<Product A> on Google Play and <Product B> on the Apple App Store". Empty if nothing.
 */
export function listingsText(key: PublisherKey): string {
  const items = PRODUCTS.flatMap((p) =>
    p.platforms.filter((pl) => pl.publisher === key).map((pl) => `${p.displayName} on ${storeLabel(pl.store)}`),
  );
  return joinList(items);
}

/** Short description of each publisher's relationship to Hetuh S4H, per the wording rules. */
const INTRO: Record<"cloudactive" | "hetuhLlc", string> = {
  cloudactive: `${CLOUDACTIVE.legalName} (CIN ${CLOUDACTIVE.cin}), an affiliated company under common ownership with ${OWNER.shortName},`,
  hetuhLlc: `${HETUH_LLC.legalName}, an independent company registered in Texas, United States,`,
};

/**
 * One sentence per publisher, e.g.
 * "<Publisher>, <relationship>, publishes <Product> on <Store> under licence from Hetuh S4H."
 * Publishers with no listings are omitted.
 */
export function publisherSentences(): string[] {
  return (["cloudactive", "hetuhLlc"] as const).flatMap((key) => {
    const listings = listingsText(key);
    return listings ? [`${INTRO[key]} publishes ${listings} under licence from ${OWNER.shortName}.`] : [];
  });
}

export function publishers(): Company[] {
  return [CLOUDACTIVE, HETUH_LLC].filter((c) => listingsText(c.key) !== "");
}
