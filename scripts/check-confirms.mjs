// Runs after `next build`. Two guards on the exported site in out/:
//
// 1. Email addresses: fails every build (review or production) if an email address on hetuh.co, or any mailto link,
//    appears in the output. Addresses must only be shown through the <Email /> sprite so crawlers cannot scrape them.
// 2. [CONFIRM] markers: fails a production build if any "[CONFIRM: …]" marker is still rendered, so unconfirmed
//    legal claims can never reach the live site. Review builds (NEXT_PUBLIC_REVIEW=1) only report the count.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = "out";
const CONFIRM_RE = /\[CONFIRM:[^\]]*\]/g;
const EMAIL_RE = /[A-Z0-9._%+-]+@hetuh\.co\b|mailto:/gi;
const TEXT_EXT = /\.(html|js|txt|xml|json|css|webmanifest)$/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const rel = (file) => relative(OUT, file).replace(/\\/g, "/");
const decode = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

const leaks = [];
const findings = [];
for (const file of walk(OUT)) {
  if (!TEXT_EXT.test(file)) continue;
  const text = readFileSync(file, "utf8");
  const emailHits = new Set(text.match(EMAIL_RE) ?? []);
  if (emailHits.size) leaks.push({ file: rel(file), items: [...emailHits] });
  if (file.endsWith(".html")) {
    const matches = new Set((text.match(CONFIRM_RE) ?? []).map(decode));
    if (matches.size) findings.push({ file: rel(file), items: [...matches] });
  }
}

if (leaks.length) {
  console.error("\nBuild blocked: email addresses or mailto links appear in the exported site.\n");
  for (const l of leaks) console.error(`  ${l.file}: ${l.items.length} occurrence(s)`);
  console.error("\nShow addresses only with <Email k=\"…\" /> (components/Email.tsx).\n");
  process.exit(1);
}

const total = findings.reduce((n, f) => n + f.items.length, 0);

if (process.env.NEXT_PUBLIC_REVIEW === "1") {
  console.log(`[review build] No email addresses in output. ${total} [CONFIRM] markers rendered across ${findings.length} pages.`);
  process.exit(0);
}

if (findings.length) {
  console.error("\nProduction build blocked: unconfirmed [CONFIRM] markers are still rendered.\n");
  for (const f of findings) {
    console.error(`  ${f.file}`);
    for (const item of f.items) console.error(`    - ${item}`);
  }
  console.error("\nResolve them in content/company.ts and content/products.ts, or run `pnpm build:review` for a review copy.\n");
  process.exit(1);
}
console.log("No email addresses and no [CONFIRM] markers in output. Production build is clean.");
