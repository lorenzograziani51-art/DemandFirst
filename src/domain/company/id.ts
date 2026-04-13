import { randomUUID } from "crypto";

export const newInternalCompanyId = (): string => `cmp_${randomUUID().replace(/-/g, "").slice(0, 20)}`;
