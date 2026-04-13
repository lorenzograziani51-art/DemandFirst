"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthService } from "@/domain/auth/service";
import { sessionCookieName } from "@/lib/auth-guard";

export const loginAction = async (formData: FormData) => {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { sessionToken, expiresAt } = await new AuthService().login({ email, password });

  (await cookies()).set(sessionCookieName, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  redirect("/dashboard");
};
