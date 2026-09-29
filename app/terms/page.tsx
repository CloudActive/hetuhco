import Link from "next/link";
import { Container } from "@/components/Container";
import { Email } from "@/components/Email";
import { formatDate, LEGAL_DEFAULTS, OWNER, TRADEMARKS } from "@/content/company";
import { PRODUCTS } from "@/content/products";
import { legalLink } from "@/lib/legal";
import { publisherSentences } from "@/lib/publishers";
import { pageMeta } from "@/lib/meta";
import { T } from "@/lib/text";

export const metadata = pageMeta({
  title: "Terms of Use",
  description:
    "Terms of use of Hetuh S4H Private Limited for hetuh.co and, as general terms, for our apps: licence, acceptable use, intellectual property, disclaimers, liability and governing law.",
  path: "/terms/",
});

export default function CompanyTermsPage() {
  return (
    <Container className="py-10">
      <article className="legal max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted">
          {OWNER.legalName} · Last updated:{" "}
          <time dateTime={LEGAL_DEFAULTS.lastUpdated}>{formatDate(LEGAL_DEFAULTS.lastUpdated)}</time>
        </p>

        <p>
          These Terms of Use (&ldquo;Terms&rdquo;) are an agreement between you and {OWNER.legalName} (&ldquo;{OWNER.shortName}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company incorporated in India (CIN {OWNER.cin}) with its registered office at{" "}
          {OWNER.addressLines.join(", ")}. They govern your use of the website hetuh.co and, as our general terms, our apps.
          Each app also has its own product-specific Terms of Use; where an app has its own terms, those apply to the app and
          take precedence over these for that app:
        </p>
        <ul>
          {PRODUCTS.map((p) => {
            const t = legalLink(p, "terms");
            return t ? <li key={p.slug}><a href={t.url} rel="noopener">{p.displayName} Terms of Use</a></li> : null;
          })}
        </ul>
        <p>By using hetuh.co or any of our apps you agree to these Terms and to our <Link href="/privacy/">Privacy Policy</Link>.</p>

        <h2 id="publishers">1. Who we are and who publishes our apps</h2>
        <p>
          {OWNER.legalName} owns and operates hetuh.co and owns all product brands and apps listed on it.
        </p>
        {publisherSentences().map((s) => <p key={s}>{s}</p>)}
        <p>Your agreement for use of an app is with {OWNER.legalName}.</p>

        <h2 id="licence">2. Licence</h2>
        <p>
          We grant you a limited, personal, non-exclusive, non-transferable and revocable licence to use hetuh.co and to
          install and use our apps on a device you own or control, for your personal, non-commercial use, subject to these
          Terms and any product-specific terms. All rights not expressly granted are reserved. You may not copy, modify,
          distribute, sell, lease, reverse engineer or decompile our software except where the law permits.
        </p>

        <h2 id="acceptable-use">3. Acceptable use</h2>
        <p>
          You agree not to use hetuh.co or our apps for any unlawful purpose; to upload or share content that is unlawful,
          defamatory, obscene, harassing, hateful, infringing or that harms or exploits minors; to impersonate anyone; to
          interfere with the operation or security of our services or gain unauthorised access to them; to scrape or harvest
          data; or to send spam.
        </p>

        <h2 id="content">4. Your content</h2>
        <p>
          You keep ownership of content you create in our apps. You grant {OWNER.shortName} a worldwide, non-exclusive,
          royalty-free licence to host, store, reproduce and display it solely as needed to operate the relevant app, including
          sharing it with people you choose to share it with in the app. You are responsible for your content and confirm you
          have the rights to share it.
        </p>

        <h2 id="third-party">5. Third-party services</h2>
        <p>
          Our apps use third-party services listed in each product privacy policy, and hetuh.co may link to third-party sites.
          We do not control those services and are not responsible for them; their own terms and privacy policies apply.
        </p>

        <h2 id="ip">6. Intellectual property</h2>
        <p>
          hetuh.co, our apps and all related software, design, text, graphics and other content are owned by {OWNER.legalName}{" "}
          or its licensors. All product brands and trademarks on this site are owned by {OWNER.legalName}, including{" "}
          {TRADEMARKS.map((t, i) => (
            <span key={t.mark}>
              {i > 0 ? ", " : ""}{t.display} ({t.jurisdiction === "India" ? "Indian" : t.jurisdiction} trademark application no. {t.applicationNo}, classes {t.classes})
            </span>
          ))}
          . A full list is on the <Link href="/legal/">Legal</Link> page. You may not use our names, logos or trademarks
          without our prior written permission.
        </p>

        <h2 id="disclaimers">7. Disclaimers</h2>
        <p>
          hetuh.co and our apps are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the fullest extent
          permitted by law we disclaim all warranties, express or implied, including merchantability, fitness for a particular
          purpose and non-infringement, and we do not warrant that our services will be uninterrupted, error-free or secure.
          Nothing in these Terms limits rights you have as a consumer under Indian law that cannot be excluded.
        </p>

        <h2 id="liability">8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {OWNER.legalName}, its directors, employees, licensors and publishers will not
          be liable for any indirect, incidental, special, consequential or punitive damages, or for loss of data, profits,
          goodwill or business, arising out of or in connection with our services or these Terms. Our total liability for all
          claims will not exceed the amount, if any, you paid us for the relevant service in the twelve months before the
          claim arose.
        </p>

        <h2 id="indemnity">9. Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless {OWNER.legalName} and its publishers from any claims, losses and expenses
          (including reasonable legal fees) arising from your breach of these Terms, your content or your misuse of our services.
        </p>

        <h2 id="termination">10. Suspension and termination</h2>
        <p>
          We may suspend or terminate your access to our services, with or without notice, if you breach these Terms, if
          required by law, or if we discontinue a service. Sections that by their nature should survive (including
          intellectual property, disclaimers, limitation of liability, indemnity and governing law) survive termination.
        </p>

        <h2 id="changes">11. Changes</h2>
        <p>
          We may change or discontinue our services at any time, and we may update these Terms; the &ldquo;Last updated&rdquo;
          date shows when they last changed. For material changes we will give notice on this site or in the relevant app
          before the change takes effect. Continued use after the change means you accept the updated Terms.
        </p>

        <h2 id="governing-law">12. Governing law and disputes</h2>
        <p>
          These Terms are governed by {LEGAL_DEFAULTS.governingLaw}.{" "}
          Subject to any mandatory consumer protection law, {LEGAL_DEFAULTS.courts} will have exclusive jurisdiction over any
          dispute arising out of or relating to these Terms or our services.
        </p>

        <h2 id="apple">13. Additional terms for the Apple App Store</h2>
        <p>
          For apps downloaded from the Apple App Store, these Terms (and any product-specific terms) are between you and{" "}
          {OWNER.legalName}, not Apple Inc. Apple is not responsible for the app or its content and has no obligation to provide
          maintenance or support. Apple is not responsible for addressing any claims relating to the app, including product
          liability, legal or regulatory compliance and consumer protection claims, or for intellectual property infringement
          claims. Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you. The
          Apple Licensed Application End User License Agreement (Apple&rsquo;s standard EULA) also applies to App Store
          downloads and takes precedence to the extent of any conflict.
        </p>

        <h2 id="contact">14. Contact</h2>
        <p>
          Legal: <Email k="legal" /> Support: <Email k="support" />
          <br />
          Postal address: {OWNER.legalName},{" "}
          {OWNER.addressLines.join(", ")}.
        </p>
      </article>
    </Container>
  );
}
