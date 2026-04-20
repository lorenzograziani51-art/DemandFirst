import { NextResponse } from "next/server";
import { AuthService } from "@/domain/auth/service";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await new AuthService().register(body);
  return NextResponse.json({ expiresAt: result.expiresAt.toISOString(), sessionToken: result.sessionToken });
}
