"use server";

import { redirect } from "next/navigation";
import { OnboardingService } from "@/domain/onboarding/service";
import { CompanyService } from "@/domain/company/service";
import { requireAuthenticatedUser } from "@/lib/auth-guard";

export const saveProfileAction = async (formData: FormData) => {
  const user = await requireAuthenticatedUser();

  const role = String(formData.get("role") ?? "buyer") as "buyer" | "supplier" | "expert";
  const fullName = String(formData.get("fullName") ?? "");

  await new OnboardingService().completeProfileStep(user.id, { role, fullName });

  redirect("/onboarding?step=company");
};

export const createCompanyAction = async (formData: FormData) => {
  const user = await requireAuthenticatedUser();

  const legalName = String(formData.get("legalName") ?? "");
  const countryCode = String(formData.get("countryCode") ?? "");
  const creatorRole = String(formData.get("creatorRole") ?? "buyer") as "buyer" | "supplier" | "expert";

  await new CompanyService().createCompanyForUser(user.id, {
    legalName,
    countryCode,
    creatorRole,
  });

  redirect("/dashboard");
};
