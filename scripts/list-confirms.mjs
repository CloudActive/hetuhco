// Lists every "[CONFIRM: …]" marker in the source, grouped by file. The owner's review checklist.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// lib/ only contains the marker pattern itself, not real items.
const DIRS = ["content", "components", "app"];
const RE = /\[CONFIRM:[^\]]*\]/g;
const isRealItem = (s) => !s.includes("…") && !s.includes("[^");

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(tsx?|mjs)$/.test(p)) yield p;
  }
}

let total = 0;
for (const dir of DIRS) {
  for (const file of walk(dir)) {
    const src = readFileSync(file, "utf8");
    const items = [...new Set(src.match(RE) ?? [])].filter(isRealItem);
    if (!items.length) continue;
    console.log(`\n${file.replace(/\\/g, "/")}`);
    for (const item of items) {
      console.log(`  - ${item}`);
      total++;
    }
  }
}
console.log(`\n${total} distinct [CONFIRM] items.`);
