import Link from "next/link";
import { Container } from "@/components/Container";
import { Email } from "@/components/Email";
import { formatDate, GRIEVANCE_OFFICER, LEGAL_DEFAULTS, OWNER } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { legalLink } from "@/lib/legal";
import { publisherSentences } from "@/lib/publishers";
import { pageMeta } from "@/lib/meta";
import { T } from "@/lib/text";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "Privacy policy of Hetuh S4H Private Limited: how we handle personal data on hetuh.co and across our apps, your rights under the DPDP Act, 2023, and how to reach our Grievance Officer.",
  path: "/privacy/",
});

export default function CompanyPrivacyPage() {
  return (
    <Container className="py-10">
      <article className="legal max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">
          {OWNER.legalName} · Last updated:{" "}
          <time dateTime={LEGAL_DEFAULTS.lastUpdated}>{formatDate(LEGAL_DEFAULTS.lastUpdated)}</time>
        </p>

        <p>
          This Privacy Policy is issued by {OWNER.legalName} (&ldquo;{OWNER.shortName}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
          a company incorporated in India (CIN {OWNER.cin}) with its registered office at {OWNER.addressLines.join(", ")}.
          {OWNER.shortName} owns the product brands listed on this site and is the data fiduciary (data controller) for the
          personal data described here.
        </p>

        <h2 id="scope">1. What this policy covers</h2>
        <p>This policy covers:</p>
        <ul>
          <li>the website hetuh.co;</li>
          <li>email and other direct communications with us;</li>
          <li>
            our apps, as the general policy of {OWNER.shortName}. Each app also has its own product-specific privacy policy
            that describes exactly what that app collects. Where an app has its own policy, that policy applies to the app and
            takes precedence over this one for that app:
            <ul>
              {PRODUCTS.map((p) => {
                const pp = legalLink(p, "privacy");
                return pp ? <li key={p.slug}><a href={pp.url} rel="noopener">{p.displayName} Privacy Policy</a></li> : null;
              })}
            </ul>
          </li>
        </ul>

        <h2 id="publishers">2. Who publishes our apps</h2>
        {publisherSentences().map((s) => <p key={s}>{s}</p>)}
        <p>Each store listing names its publisher, and the product privacy policy for that app names it too.</p>

        <h2 id="website">3. Personal data on hetuh.co</h2>
        <p>
          hetuh.co is a static informational website. It does not use cookies, analytics, advertising or tracking, and it does
          not have accounts or forms. Our hosting and content delivery providers process standard server logs (IP address,
          browser type, pages requested, timestamps) to serve the site and protect it from abuse; these logs are kept for a
          limited period for security and operational purposes.
        </p>

        <h2 id="email">4. When you contact us</h2>
        <p>
          When you email us at any address on our <Link href="/contact/">Contact</Link> page, we process your email address, name and the
          content of your message to respond to you and keep a record of the correspondence. We keep correspondence only for
          as long as needed to handle your request and keep a record of it, unless the law requires longer.
        </p>

        <h2 id="apps">5. Personal data in our apps</h2>
        <p>
          In our apps we collect only the personal data needed to provide the features you use, such as account information,
          the content you create, device and diagnostic data, and support communications. The product-specific policies linked
          in section 1 list the exact data, purposes, third-party processors, storage location and retention for each app.
        </p>

        <h2 id="legal-basis">6. Legal basis and consent</h2>
        <p>
          Under the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), we process personal data on the basis
          of your consent for the specified purposes described in this policy and in the product policies, and for certain
          legitimate uses the DPDP Act permits, such as complying with the law or responding to an emergency. You may withdraw
          consent at any time by emailing <Email k="privacy" /> or, for an app, by deleting your
          account.
        </p>

        <h2 id="sharing">7. Sharing</h2>
        <p>
          We share personal data with service providers that process it on our instructions (hosting, email, and the app
          service providers named in each product policy), with our licensed publishers to the limited extent needed to publish
          the apps, where required by law or to protect safety and our rights, and as part of a merger, acquisition or sale of
          assets, with notice to you.
        </p>

        <h2 id="transfers">8. International transfers</h2>
        <p>
          Some service providers process data outside India. Where we transfer personal data outside India we do so in
          accordance with the DPDP Act and any restrictions notified by the Central Government, with safeguards in place.
        </p>

        <h2 id="security">9. Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect personal data, including encryption in transit
          and access controls. If we become aware of a personal data breach affecting you, we will notify you and the Data
          Protection Board of India as required by the DPDP Act.
        </p>

        <h2 id="rights">10. Your rights</h2>
        <p>
          Subject to applicable law you may access, correct and update your personal data, ask for its erasure, withdraw
          consent, nominate a person to exercise your rights if you are unable to, and raise a grievance with our Grievance
          Officer. If you are not satisfied with our response you may approach the Data Protection Board of India. Email{" "}
          <Email k="privacy" /> to exercise any right. We may verify your identity first.
        </p>

        <h2 id="children">11. Children</h2>
        <p>
          Our website and apps are not directed at children under {LEGAL_DEFAULTS.minimumAge}.{" "}
          We do not knowingly collect personal data from a child without verifiable parental consent as required by the DPDP
          Act. Contact <Email k="privacy" /> if you believe a child has provided us with data.
        </p>

        <h2 id="changes">12. Changes</h2>
        <p>
          We may update this policy from time to time; the &ldquo;Last updated&rdquo; date shows when it last changed. For
          material changes we will give notice on this site or in the relevant app before the change takes effect.
        </p>

        <h2 id="grievance">13. Grievance Officer</h2>
        <dl>
          <div><dt>Name</dt><dd><T>{GRIEVANCE_OFFICER.name}</T></dd></div>
          <div><dt>Email</dt><dd><Email k="privacy" /></dd></div>
          <div><dt>Postal address</dt><dd>{OWNER.legalName}, {GRIEVANCE_OFFICER.addressLines.join(", ")}</dd></div>
          <div><dt>Response timeline</dt><dd><T>{`We acknowledge grievances promptly and aim to resolve them ${GRIEVANCE_OFFICER.responseTime}.`}</T></dd></div>
        </dl>

        <h2 id="contact">14. Contact</h2>
        <p>
          Privacy: <Email k="privacy" /> Support: <Email k="support" /> Legal: <Email k="legal" />
          <br />
          Postal address: {OWNER.legalName}, {OWNER.addressLines.join(", ")}.
        </p>
      </article>
    </Container>
  );
}
