import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-muted">The page you asked for does not exist on hetuh.co.</p>
      <p className="mt-6"><Link href="/" className="text-accent hover:underline">Go to the home page</Link></p>
    </Container>
  );
}
