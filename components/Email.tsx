import sprite from "@/content/email-sprite.json";

export type EmailKey = keyof typeof sprite.items;

const LABELS: Record<EmailKey, string> = {
  support: "Support email address",
  privacy: "Privacy email address",
  legal: "Legal email address",
};

/**
 * Shows one email address from the sprite in public/contact.png by shifting its background position.
 * The address itself never appears in the HTML, so crawlers cannot scrape it.
 * Regenerate the sprite with `python scripts/make_email_sprite.py` after changing EMAILS.
 */
export function Email({ k }: { k: EmailKey }) {
  const item = sprite.items[k];
  return (
    <span
      role="img"
      aria-label={LABELS[k]}
      className="inline-block align-middle"
      style={{
        width: item.w,
        height: sprite.rowHeight,
        backgroundImage: `url(${sprite.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${sprite.width}px ${sprite.height}px`,
        backgroundPosition: `0 -${item.y}px`,
      }}
    />
  );
}
