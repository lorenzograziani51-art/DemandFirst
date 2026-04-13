"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthService } from "@/domain/auth/service";
import { sessionCookieName } from "@/lib/auth-guard";

export const registerAction = async (formData: FormData) => {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "");

  const { sessionToken, expiresAt } = await new AuthService().register({
    email,
    password,
    fullName,
  });

  (await cookies()).set(sessionCookieName, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  redirect("/onboarding");
};
