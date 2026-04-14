import { prisma } from "@/lib/prisma";
import { requireAuthenticatedUser } from "@/lib/auth-guard";
import { createCompanyAction, saveProfileAction } from "./actions";
import { Button, Input, SelectField, Badge } from "@/components/forms";
import { PageShell, InfoCard } from "@/components/layout";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams?: Promise<{ step?: string }>;
}) {
  const user = await requireAuthenticatedUser();
  const resolved = await searchParams;
  const step = resolved?.step ?? "profile";

  const existing = await prisma.onboardingProgress.findMany({ where: { userId: user.id } });

  return (
    <PageShell
      eyebrow="Guided Setup"
      title="Onboarding"
      description="Progressive setup with only essential fields for buyer, supplier, or expert organizations."
    >
      <InfoCard>
        <Badge>Role tracks: {existing.map((item) => item.role).join(", ") || "none"}</Badge>

        {step === "profile" ? (
          <form action={saveProfileAction} className="df-form">
            <SelectField label="Role" name="role" defaultValue={user.onboardingRole ?? "buyer"}>
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
              <option value="expert">Expert</option>
            </SelectField>
            <Input label="Full name" name="fullName" defaultValue={user.fullName ?? ""} />
            <Button>Save profile step</Button>
          </form>
        ) : (
          <form action={createCompanyAction} className="df-form">
            <Input label="Company legal name" name="legalName" />
            <Input label="Country code (ISO 3166-1 alpha-2)" name="countryCode" maxLength={2} />
            <SelectField
              label="Primary role in DemandFirst"
              name="creatorRole"
              defaultValue={user.onboardingRole ?? "buyer"}
            >
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
              <option value="expert">Expert</option>
            </SelectField>
            <Button>Create company and finish onboarding</Button>
          </form>
        )}
      </InfoCard>
    </PageShell>
  );
}
