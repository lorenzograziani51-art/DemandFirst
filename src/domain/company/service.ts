import { Prisma, type CompanyMemberRole, type CompanyStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { companyCreateSchema, type CompanyCreateInput } from "./validation";
import { newInternalCompanyId } from "./id";

const roleMap: Record<CompanyCreateInput["creatorRole"], CompanyMemberRole> = {
  buyer: "buyer",
  supplier: "supplier",
  expert: "expert",
};

export class CompanyService {
  async createCompanyForUser(userId: string, rawInput: CompanyCreateInput) {
    const input = companyCreateSchema.parse(rawInput);

    return prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          internalCompanyId: newInternalCompanyId(),
          legalName: input.legalName,
          countryCode: input.countryCode,
          status: "draft",
        },
      });

      await tx.membership.create({
        data: {
          userId,
          companyId: company.id,
          role: roleMap[input.creatorRole],
          isPrimary: true,
        },
      });

      await tx.onboardingProgress.upsert({
        where: { userId_role: { userId, role: input.creatorRole } },
        update: { companyId: company.id, companyComplete: true },
        create: {
          userId,
          role: input.creatorRole,
          companyId: company.id,
          companyComplete: true,
        },
      });

      return company;
    });
  }

  async updateCompanyStatus(companyId: string, status: CompanyStatus) {
    return prisma.company.update({ where: { id: companyId }, data: { status } });
  }

  canTransitionCompanyStatus(current: CompanyStatus, next: CompanyStatus): boolean {
    const transitions: Record<CompanyStatus, CompanyStatus[]> = {
      draft: ["pending_review", "rejected"],
      pending_review: ["active", "rejected"],
      active: ["suspended"],
      suspended: ["active", "rejected"],
      rejected: [],
    };

    return transitions[current].includes(next);
  }

  assertCompanyVisible(status: CompanyStatus) {
    if (status === Prisma.CompanyStatus.suspended || status === Prisma.CompanyStatus.rejected) {
      throw new Error("Company is not eligible for marketplace activity");
    }
  }
}
