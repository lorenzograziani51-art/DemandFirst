import { requireDashboardAccess } from "@/lib/auth-guard";
import { Badge } from "@/components/forms";
import { PageShell, InfoCard } from "@/components/layout";

export default async function DashboardPage() {
  const { user, membership } = await requireDashboardAccess();

  return (
    <PageShell
      eyebrow="Workspace"
      title="Dashboard"
      description="Operational visibility for your organization and marketplace participation."
    >
      <InfoCard>
        <Badge>{membership.role}</Badge>
        <p>Welcome {user.fullName ?? user.email}</p>
        <p>Company: {membership.company.legalName}</p>
        <p>Company Internal ID: {membership.company.internalCompanyId}</p>
        <p>Status: {membership.company.status}</p>
      </InfoCard>
    </PageShell>
  );
}
