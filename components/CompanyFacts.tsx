import { EMAILS, OWNER, TRADEMARKS } from "@/content/company";

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
              {t.display}: {t.jurisdiction === "India" ? "Indian" : t.jurisdiction} trademark application no. {t.applicationNo} (classes {t.classes}), filed {t.filedOn}
            </span>
          ))}        </dd>
      </div>
      <div>
        <dt className="font-semibold text-ink">Contact</dt>
        <dd className="text-muted">
          <a className="block hover:text-ink" href={`mailto:${EMAILS.legal}`}>{EMAILS.legal}</a>
          <a className="block hover:text-ink" href={`mailto:${EMAILS.privacy}`}>{EMAILS.privacy}</a>
          <a className="block hover:text-ink" href={`mailto:${EMAILS.support}`}>{EMAILS.support}</a>
        </dd>
      </div>
    </dl>
  );
}
