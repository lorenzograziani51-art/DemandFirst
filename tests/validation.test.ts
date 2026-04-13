import { describe, expect, it } from "vitest";
import { companyCreateSchema } from "@/domain/company/validation";
import { onboardingProfileSchema } from "@/domain/onboarding/validation";

describe("zod input validation", () => {
  it("normalizes and validates progressive company input", () => {
    const parsed = companyCreateSchema.parse({
      legalName: "DemandFirst Labs",
      countryCode: "us",
      creatorRole: "buyer",
    });

    expect(parsed.countryCode).toBe("US");
  });

  it("rejects too short onboarding names", () => {
    const fn = () => onboardingProfileSchema.parse({ role: "expert", fullName: "A" });
    expect(fn).toThrowError();
  });
});
