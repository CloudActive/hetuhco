// Runs after `next build`. Fails a production build if any "[CONFIRM: …]" marker is still
// rendered in the exported HTML, so unconfirmed legal claims can never reach the live site.
// Review builds (NEXT_PUBLIC_REVIEW=1) only report the count so the draft can be shared.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = "out";
const RE = /\[CONFIRM:[^\]]*\]/g;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith(".html")) yield p;
  }
}

const decode = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

const findings = [];
for (const file of walk(OUT)) {
  const html = readFileSync(file, "utf8");
  const matches = new Set((html.match(RE) ?? []).map(decode));
  if (matches.size) findings.push({ file: relative(OUT, file).replace(/\\/g, "/"), items: [...matches] });
}

const total = findings.reduce((n, f) => n + f.items.length, 0);

if (process.env.NEXT_PUBLIC_REVIEW === "1") {
  console.log(`[review build] ${total} [CONFIRM] markers rendered across ${findings.length} pages.`);
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
console.log("No [CONFIRM] markers rendered. Production build is clean.");
