import { prisma } from "@/lib/prisma";
import { onboardingProfileSchema, onboardingRoleSchema, type OnboardingProfileInput, type OnboardingRoleInput } from "./validation";

export class OnboardingService {
  async startRoleTrack(userId: string, rawRole: OnboardingRoleInput) {
    const role = onboardingRoleSchema.parse(rawRole);

    await prisma.user.update({ where: { id: userId }, data: { onboardingRole: role } });

    return prisma.onboardingProgress.upsert({
      where: { userId_role: { userId, role } },
      update: {},
      create: { userId, role },
    });
  }

  async completeProfileStep(userId: string, rawInput: OnboardingProfileInput) {
    const input = onboardingProfileSchema.parse(rawInput);

    return prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { fullName: input.fullName, onboardingRole: input.role },
      });

      return tx.onboardingProgress.upsert({
        where: { userId_role: { userId, role: input.role } },
        update: { profileComplete: true },
        create: {
          userId,
          role: input.role,
          profileComplete: true,
        },
      });
    });
  }
}
