import type { ReactNode } from "react";

const CONFIRM_RE = /(\[CONFIRM:[^\]]*\])/g;

/**
 * Renders a string, wrapping every "[CONFIRM: …]" marker in a highlighted <mark>
 * so reviewers can spot unconfirmed claims. The marker text is kept verbatim so
 * scripts/check-confirms.mjs can find it in the exported HTML and block a production build.
 */
export function T({ children }: { children: string }): ReactNode {
  const parts = children.split(CONFIRM_RE);
  if (parts.length === 1) return children;
  return parts.map((part, i) =>
    part.startsWith("[CONFIRM:") ? (
      <mark key={i} className="confirm" title="Draft claim: confirm before launch">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
