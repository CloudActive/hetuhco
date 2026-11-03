# Review notes (not published)

> **All legal text on this site must be reviewed by counsel before launch.** The company Privacy Policy and Terms of
> Use at `/privacy/` and `/terms/` are drafts, not legal advice.

## How review works

- `pnpm build:review` produces a review copy in `out/` with every `[CONFIRM: …]` marker highlighted.
  Product pages also show an "Open questions for the owner" box in review builds.
- `pnpm build` (production) **fails** while any `[CONFIRM]` marker is still rendered, so unconfirmed claims cannot go live.
- `pnpm confirms` prints the current list of markers grouped by file.

## What hetuh.co hosts and what it links to

hetuh.co hosts the **company-level** pages of Hetuh S4H Private Limited: `/privacy/`, `/terms/`, `/support/`, plus
`/about/`, `/contact/` and `/legal/`. These are the URLs for new store developer accounts of Hetuh S4H.

Each **product's** privacy policy, terms and other legal pages live on the product's own website. hetuh.co links to
them from the product pages, `/legal/`, `/support/` and the footer, and does not host a second copy. Links are set in
`legalLinks` in `content/products.ts`. Only pages that load without signing in are linked.

| Product | Page | URL |
|---|---|---|
| triphetu | Privacy Policy | https://triphetu.com/privacy |
| triphetu | Terms of Use | https://triphetu.com/terms |
| triphetu | Support | https://triphetu.com/support |
| triphetu | Delete Account | https://triphetu.com/delete-account |
| triphetu | Ownership & Licensing | https://triphetu.com/legal |
| SahPath | Privacy Policy | https://sahpath.app/privacy |
| SahPath | Support | https://sahpath.app/support |
| SahPath | Delete Account | https://sahpath.app/delete-account |
| SahPath | Ownership & Licensing | https://sahpath.app/legal |

## Issues found on the product sites (checked 2026-09-29; not changed from here)

- **triphetu.com/child-safety** redirects to app.triphetu.com/child-safety, which returns 404. Google Play needs a public
  child safety standards page for apps with social features.
- **triphetu.com/privacy** and **triphetu.com/legal** name Cloudactive Labs as the Android publisher. Since 2 Nov 2026
  Hetuh LLC publishes triphetu on both stores and Cloudactive Labs is the developer only; update those pages. The
  privacy policy also does not name a Grievance Officer.
- **Publishers:** since 2 Nov 2026 Hetuh LLC publishes both apps on Google Play and the App Store. Cloudactive Labs
  is the licensed developer only and does not publish or distribute them. Hetuh LLC is a Texas LLC, file number
  805742743.
- **sahpath.app/terms** and **sahpath.app/child-safety** redirect to a login page, so they are not public and are not linked.
- Minimum age: both product policies say "not directed to children under 13". The hetuh.co company pages still carry a
  `[CONFIRM]` for minimum age; align them.

## Email addresses

Three addresses are used: support, privacy and legal. They are defined once in `EMAILS` in `content/company.ts`.

The site never shows them as text or mailto links. They are drawn into one PNG sprite (`public/contact.png`), and
the `<Email k="…" />` component shows one address at a time by shifting the background position. After changing an
address, run `python scripts/make_email_sprite.py` (needs Pillow) and commit the new PNG and
`content/email-sprite.json`. Every build fails if an address or a mailto link appears in the exported site.

## Open `[CONFIRM]` items

None are rendered, so the production build passes. These were resolved with neutral wording rather than specifics;
tighten them after counsel review if wanted:

- Courts: "the competent courts in India". Set a seat (Noida or Delhi) in `LEGAL_DEFAULTS.courts`.
- Minimum age: 13, matching triphetu.com and sahpath.app (`LEGAL_DEFAULTS.minimumAge`).
- hetuh.co server logs: "kept for a limited period"; no providers or period named (`app/privacy/page.tsx`).
- Correspondence: kept "as long as needed to handle your request"; no fixed period (`app/privacy/page.tsx`).
- The "no advertising and no data sales" sentence was removed from the company privacy policy; add it back only if
  true for every app (`app/privacy/page.tsx`).
- Liability cap: limited to the amount paid, if any; no fixed INR amount (`app/terms/page.tsx`).

## Open questions (shown in review builds on product pages)


## Confirmed facts

Grievance Officer Suraj Singh, grievances resolved within 30 days of receipt; support responds within 2 business days;
TRIPHETU is the only trademark listed; SahPath has no tagline; SahPath description taken from sahpath.app/privacy;
Hetuh LLC is a Texas limited liability company, file number 805742743 (from sahpath.app/legal), address
8787 N MacArthur Blvd Ste 120A, Irving, Texas 75063-5406 (from hetuh-1pager commit e04af39).

## Not changed

Nothing on the product websites was touched.

## Store status (2 Nov 2026)

Both apps are live. hetuh.co shows "Available now" and a single Download button per product that opens the
product's own download page (`downloadUrl` in `content/products.ts`), which lists Google Play and the App Store:

| Product | Download page | Store IDs shown on hetuh.co |
|---|---|---|
| triphetu | https://triphetu.com/download | Google Play and App Store `com.triphetu.app`; App Store seller HETUH LLC |
| SahPath | https://sahpath.app/download | Google Play and App Store `com.sahpath.app`; App Store seller HETUH LLC |
