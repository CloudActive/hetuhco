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
- **triphetu.com/privacy** names Hetuh S4H as owner and Cloudactive Labs as Android publisher. It does not name a
  Grievance Officer.
- **triphetu on hetuh.co** shows only its Google Play listing (Cloudactive Labs). No other store entry is shown for it
  until the owner says otherwise.
- **SahPath on Google Play** is being transferred from Cloudactive Labs to Hetuh LLC. hetuh.co and sahpath.app/legal
  already name Hetuh LLC (Texas LLC, file number 805742743); the Play listing shows Cloudactive Labs until the transfer
  completes.
- **sahpath.app/terms** and **sahpath.app/child-safety** redirect to a login page, so they are not public and are not linked.
- Minimum age: both product policies say "not directed to children under 13". The hetuh.co company pages still carry a
  `[CONFIRM]` for minimum age; align them.

## Email addresses used on hetuh.co (create these mailboxes or aliases)

| Address | Used for |
|---|---|
| support@hetuh.co | Company support page, contact page, footer, terms |
| privacy@hetuh.co | Company privacy policy, Grievance Officer, rights requests |
| legal@hetuh.co | Legal notices, terms contact |

All three are defined once in `EMAILS` in `content/company.ts`. The product sites use their own addresses
(for example support@triphetu.com and privacy@triphetu.com).

## Open `[CONFIRM]` items

- Governing courts: Noida or Delhi (`content/company.ts`).
- Minimum age for users; the product sites say 13 (`content/company.ts`).
- Hosting/CDN providers and server-log retention for hetuh.co (`app/privacy/page.tsx`).
- Correspondence retention period (`app/privacy/page.tsx`).
- No advertising SDKs or data sales in any app (`app/privacy/page.tsx`).
- Liability cap amount, drafted as INR 1,000 (`app/terms/page.tsx`).

## Open questions (shown in review builds on product pages)

- SahPath: Android package ID; whether an iOS version exists, its status and bundle ID.

## Confirmed facts

Grievance Officer Suraj Singh, grievances resolved within 30 days of receipt; support responds within 2 business days;
TRIPHETU is the only trademark listed; SahPath has no tagline; SahPath description taken from sahpath.app/privacy;
Hetuh LLC is a Texas limited liability company, file number 805742743 (from sahpath.app/legal), address
8787 N MacArthur Blvd Ste 120A, Irving, Texas 75063-5406 (from hetuh-1pager commit e04af39).

## Not changed

Nothing on the product websites was touched.
