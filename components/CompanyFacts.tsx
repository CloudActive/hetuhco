import { OWNER, TRADEMARKS } from "@/content/company";
import { Email } from "./Email";

export function CompanyFacts() {
  return (
    <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
      <div>
        <dt className="font-semibold text-ink">Legal name</dt>
        <dd className="text-muted">{OWNER.legalName}</dd>
      </div>
      <div>
        <dt className="font-semibold text-ink">CIN</dt>
        <dd className="text-muted">{OWNER.cin}</dd>
      </div>
      <div>
        <dt className="font-semibold text-ink">Registered office</dt>
        <dd className="text-muted">
          {OWNER.addressLines.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-ink">Director</dt>
        <dd className="text-muted">{OWNER.director}</dd>
      </div>
      <div>
        <dt className="font-semibold text-ink">Trademarks</dt>
        <dd className="text-muted">
          {TRADEMARKS.map((t) => (
            <span key={t.mark} className="block">
              {t.display}: {t.jurisdiction === "India" ? "Indian" : t.jurisdiction} trademark application no. {t.applicationNo} (classes {t.classes})
            </span>
          ))}
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-ink">Contact</dt>
        <dd>
          <span className="block"><Email k="legal" /></span>
          <span className="block"><Email k="privacy" /></span>
          <span className="block"><Email k="support" /></span>
        </dd>
      </div>
    </dl>
  );
}
