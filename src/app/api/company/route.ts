import { NextResponse } from "next/server";
import { CompanyService } from "@/domain/company/service";
import { requireAuthenticatedUser } from "@/lib/auth-guard";

export async function POST(request: Request) {
  const user = await requireAuthenticatedUser();
  const body = await request.json();
  const company = await new CompanyService().createCompanyForUser(user.id, body);

  return NextResponse.json({
    id: company.id,
    internalCompanyId: company.internalCompanyId,
    legalName: company.legalName,
    status: company.status,
  });
}
