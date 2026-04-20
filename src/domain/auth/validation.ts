import { z } from "zod";

export const registerInputSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(10).max(72),
  fullName: z.string().trim().min(2).max(120).optional(),
});

export const loginInputSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
