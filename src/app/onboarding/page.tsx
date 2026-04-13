import { prisma } from "@/lib/prisma";
import { requireAuthenticatedUser } from "@/lib/auth-guard";
import { createCompanyAction, saveProfileAction } from "./actions";

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
    <main>
      <h1>Onboarding</h1>
      <p>Progressive setup with only essential fields for buyer, supplier, or expert.</p>
      <p>Existing role tracks: {existing.map((item) => item.role).join(", ") || "none"}</p>

      {step === "profile" ? (
        <form action={saveProfileAction}>
          <label>
            Role
            <select name="role" defaultValue={user.onboardingRole ?? "buyer"}>
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
              <option value="expert">Expert</option>
            </select>
          </label>
          <label>
            Full name
            <input name="fullName" defaultValue={user.fullName ?? ""} required />
          </label>
          <button type="submit">Save profile step</button>
        </form>
      ) : (
        <form action={createCompanyAction}>
          <label>
            Company legal name
            <input name="legalName" required />
          </label>
          <label>
            Country code (ISO 3166-1 alpha-2)
            <input name="countryCode" maxLength={2} required />
          </label>
          <label>
            Primary role in DemandFirst
            <select name="creatorRole" defaultValue={user.onboardingRole ?? "buyer"}>
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
              <option value="expert">Expert</option>
            </select>
          </label>
          <button type="submit">Create company and finish onboarding</button>
        </form>
      )}
    </main>
  );
}
