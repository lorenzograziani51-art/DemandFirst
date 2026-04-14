import Link from "next/link";
import { PageShell, InfoCard } from "@/components/layout";
import { Badge } from "@/components/forms";

export default function HomePage() {
  return (
    <PageShell
      eyebrow="DemandFirst Platform"
      title="Demand-led operating foundation"
      description="Built for serious category teams, suppliers, and advisors coordinating premium cosmetics programs."
    >
      <InfoCard>
        <Badge>B2B Cosmetics Marketplace</Badge>
        <h2>Core journeys</h2>
        <p>Enter through secure account setup and complete role-based onboarding to unlock your demand workspace.</p>
        <ul>
          <li><Link href="/register">Create account</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/onboarding">Onboarding</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </InfoCard>
    </PageShell>
  );
}
