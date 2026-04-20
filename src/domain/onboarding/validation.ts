import { z } from "zod";

export const onboardingRoleSchema = z.enum(["buyer", "supplier", "expert"]);

export const onboardingProfileSchema = z.object({
  role: onboardingRoleSchema,
  fullName: z.string().trim().min(2).max(120),
});

export type OnboardingRoleInput = z.infer<typeof onboardingRoleSchema>;
export type OnboardingProfileInput = z.infer<typeof onboardingProfileSchema>;
