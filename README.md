# hetuh.co — Hetuh S4H Private Limited

Corporate website of Hetuh S4H Private Limited, the owner of the triphetu™ and SahPath brands. It hosts the company
privacy policy, terms and support pages, and links to each product's own legal pages on the product website.

Static site built with Next.js (App Router, `output: "export"`) and Tailwind CSS. No server, no cookies, no analytics.

## Commands

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm build            # production export to out/ (fails while any [CONFIRM] marker remains)
pnpm build:review     # review export with highlighted [CONFIRM] markers
pnpm serve            # serve out/ locally
pnpm confirms         # list every [CONFIRM] item in the source
python scripts/make_email_sprite.py   # regenerate the email sprite after changing EMAILS (needs Pillow)
```

Email addresses are shown only as an image sprite (`public/contact.png`) through `components/Email.tsx`, never as
text, so crawlers cannot scrape them. Builds fail if an address appears in the exported site.

## Where things live

| What | File |
|---|---|
| Company facts, publishers, trademarks, emails, grievance officer, legal defaults | `content/company.ts` |
| Products, platforms, publishers per store, links to each product's legal pages | `content/products.ts` |
| Company privacy policy, terms and support | `app/privacy/`, `app/terms/`, `app/support/` |
| Page routes | `app/**` |
| Old-URL inventory and optional redirect | `redirects/` |
| Review notes and open items | `REVIEW.md` |

Adding a product: add an entry to `content/products.ts` with its `legalLinks`. The product page, legal index, support
page, sitemap and footer follow automatically.

## Deploy

Build command `pnpm build`, output directory `out`. Works on DigitalOcean App Platform (static site), Cloudflare Pages,
Netlify or any static host. The optional `/index.html` redirect is described in `redirects/README.md`.
