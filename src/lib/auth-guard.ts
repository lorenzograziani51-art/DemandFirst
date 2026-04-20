import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthService } from "@/domain/auth/service";
import { prisma } from "@/lib/prisma";
import { canAccessDashboard } from "@/domain/authorization/policy";

const SESSION_COOKIE = "df_session";

export const requireAuthenticatedUser = async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) {
    redirect("/login");
  }

  const user = await new AuthService().getUserFromSessionToken(token);
  if (!user) {
    redirect("/login");
  }

  return user;
};

export const requireDashboardAccess = async () => {
  const user = await requireAuthenticatedUser();

  const membership = await prisma.membership.findFirst({
    where: { userId: user.id, isPrimary: true },
    include: { company: true },
    orderBy: { createdAt: "asc" },
  });

  if (!membership || !canAccessDashboard({
    userId: user.id,
    companyStatus: membership.company.status,
    membershipRole: membership.role,
  })) {
    redirect("/onboarding");
  }

  return { user, membership };
};

export const sessionCookieName = SESSION_COOKIE;
