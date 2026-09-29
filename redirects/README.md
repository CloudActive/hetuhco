# Old hetuh.co URLs: inventory and where they resolve now

The old hetuh.co was a single-page site for Hetuh LLC, which has moved to https://hetuhai.com. Every path that
existed on the old site must keep working. This is the full inventory, verified live on 2026-09-28 before the change.

| Old hetuh.co URL | Before | After |
|---|---|---|
| `/` | 200, Hetuh LLC one-pager | 200, Hetuh S4H home page (new site) |
| `/index.html` | 200, same page | 301 to `https://hetuh.co/` (optional; the file also exists in the export) |
| `/#home` `/#about` `/#services` `/#technologies` `/#contact` | in-page anchors of `/` | fragments never reach the server; they open the new home page. `/about/` and `/contact/` exist on the new site. |
| `/privacy` | 404 (footer link was `#`) | 200, Hetuh S4H company Privacy Policy |
| `/terms` | 404 (footer link was `#`) | 200, Hetuh S4H company Terms of Use |
| `/support` | 404 | 200, Hetuh S4H company Support page |
| `/robots.txt`, `/sitemap.xml` | 404 | 200, new site |

No path on the old hetuh.co needs to redirect to hetuhai.com: the only page that existed was `/`, and the new site
serves a page at that exact path. The Hetuh LLC iOS app and App Store Connect links are being updated to hetuhai.com
directly. `/privacy`, `/terms` and `/support` on hetuh.co are Hetuh S4H pages, intended for new store developer
accounts of Hetuh S4H; they do not forward to Hetuh LLC. Product legal pages are not hosted on hetuh.co; they live on
triphetu.com and sahpath.app, and hetuh.co links to them.

## Applying the one remaining redirect (optional)

hetuh.co is served by DigitalOcean App Platform (static site) behind Cloudflare. The export contains `index.html`, so
`/index.html` already works without a redirect. To canonicalise it to `/`, import `cloudflare-bulk-redirects.csv` as a
Bulk Redirect list in the Cloudflare dashboard (account level, Bulk Redirects, Import CSV) and enable a rule for it.
If the site later moves to Cloudflare Pages, copy `_redirects` into `public/` instead.

## Verify after deploy

```bash
curl -sI https://hetuh.co/privacy/ | grep -iE '^(HTTP|location)'
```

```bash
curl -sI https://hetuh.co/terms/ | grep -iE '^(HTTP|location)'
```
