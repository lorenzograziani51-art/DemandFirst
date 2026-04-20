import type { CompanyMemberRole, CompanyStatus } from "@prisma/client";

export type ActorContext = {
  userId: string;
  companyStatus: CompanyStatus;
  membershipRole: CompanyMemberRole;
};

export const canAccessDashboard = (ctx: ActorContext): boolean => {
  if (!ctx.userId) {
    return false;
  }

  if (["suspended", "rejected"].includes(ctx.companyStatus)) {
    return false;
  }

  return ["owner", "admin", "buyer", "supplier", "expert"].includes(ctx.membershipRole);
};

export const canSubmitDemand = (ctx: ActorContext): boolean => {
  if (!canAccessDashboard(ctx)) {
    return false;
  }

  return ["owner", "admin", "buyer"].includes(ctx.membershipRole);
};

export const canRespondToDemand = (ctx: ActorContext): boolean => {
  if (!canAccessDashboard(ctx)) {
    return false;
  }

  return ["owner", "admin", "supplier", "expert"].includes(ctx.membershipRole);
};
