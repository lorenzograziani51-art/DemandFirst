import { requireDashboardAccess } from "@/lib/auth-guard";

export default async function DashboardPage() {
  const { user, membership } = await requireDashboardAccess();

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome {user.fullName ?? user.email}</p>
      <p>Company: {membership.company.legalName}</p>
      <p>Company Internal ID: {membership.company.internalCompanyId}</p>
      <p>Status: {membership.company.status}</p>
      <p>Your membership role: {membership.role}</p>
    </main>
  );
}
