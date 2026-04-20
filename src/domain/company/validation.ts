import { z } from "zod";

export const companyCreateSchema = z.object({
  legalName: z.string().trim().min(2).max(180),
  countryCode: z.string().trim().length(2).toUpperCase(),
  creatorRole: z.enum(["buyer", "supplier", "expert"]),
});

export type CompanyCreateInput = z.infer<typeof companyCreateSchema>;
