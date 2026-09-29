import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { EMAILS, GRIEVANCE_OFFICER, LEGAL_DEFAULTS, OWNER } from "@/content/company";
import { pageMeta } from "@/lib/meta";
import { T } from "@/lib/text";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Contact Hetuh S4H Private Limited: support, privacy and legal email addresses, registered office and Grievance Officer.",
  path: "/contact/",
});

const CONTACTS = [
  { label: "Support", email: EMAILS.support, note: "Help with any of our apps." },
  { label: "Privacy", email: EMAILS.privacy, note: "Privacy requests, data access, correction and deletion, grievances." },
  { label: "Legal", email: EMAILS.legal, note: "Legal notices, trademark and licensing matters, child-safety reports." },
];

export default function ContactPage() {
  return (
    <Container className="py-12">
      <PageHeader title="Contact" lede="Email is the fastest way to reach us." />
      <div className="grid gap-4 sm:grid-cols-3">
        {CONTACTS.map((c) => (
          <div key={c.email} className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold text-ink">{c.label}</h2>
            <a href={`mailto:${c.email}`} className="mt-1 block break-all text-accent hover:underline">{c.email}</a>
            <p className="mt-2 text-sm text-muted">{c.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted"><T>{`We aim to respond to support requests ${LEGAL_DEFAULTS.supportResponseTime}.`}</T></p>

      <section className="legal mt-10" aria-labelledby="office">
        <h2 id="office">Registered office</h2>
        <address className="mt-4 leading-7">
          <strong>{OWNER.legalName}</strong><br />
          {OWNER.addressLines.map((l) => <span key={l}>{l}<br /></span>)}
          CIN {OWNER.cin}
        </address>
      </section>

      <section className="legal" aria-labelledby="grievance">
        <h2 id="grievance">Grievance Officer</h2>
        <p>
          Under the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, you may raise a
          grievance about the handling of your personal data with our Grievance Officer.
        </p>
        <dl>
          <div><dt>Name</dt><dd><T>{GRIEVANCE_OFFICER.name}</T></dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a></dd></div>
          <div><dt>Postal address</dt><dd>{OWNER.legalName}, {GRIEVANCE_OFFICER.addressLines.join(", ")}</dd></div>
          <div><dt>Response timeline</dt><dd><T>{GRIEVANCE_OFFICER.responseTime}</T></dd></div>
        </dl>
      </section>
    </Container>
  );
}
