import { NextResponse } from "next/server";
import { OnboardingService } from "@/domain/onboarding/service";
import { requireAuthenticatedUser } from "@/lib/auth-guard";

export async function POST(request: Request) {
  const user = await requireAuthenticatedUser();
  const body = await request.json();

  const progress = await new OnboardingService().completeProfileStep(user.id, body);
  return NextResponse.json({ id: progress.id, profileComplete: progress.profileComplete, role: progress.role });
}
