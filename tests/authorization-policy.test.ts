import { describe, expect, it } from "vitest";
import { canAccessDashboard, canRespondToDemand, canSubmitDemand } from "@/domain/authorization/policy";

describe("authorization policy", () => {
  it("allows buyer company members with active company to access dashboard", () => {
    expect(
      canAccessDashboard({
        userId: "u1",
        companyStatus: "active",
        membershipRole: "buyer",
      }),
    ).toBe(true);
  });

  it("blocks suspended companies", () => {
    expect(
      canAccessDashboard({
        userId: "u1",
        companyStatus: "suspended",
        membershipRole: "buyer",
      }),
    ).toBe(false);
  });

  it("enforces demand submit/response role scopes", () => {
    const buyerCtx = { userId: "u1", companyStatus: "active" as const, membershipRole: "buyer" as const };
    expect(canSubmitDemand(buyerCtx)).toBe(true);
    expect(canRespondToDemand(buyerCtx)).toBe(false);

    const supplierCtx = { userId: "u2", companyStatus: "active" as const, membershipRole: "supplier" as const };
    expect(canSubmitDemand(supplierCtx)).toBe(false);
    expect(canRespondToDemand(supplierCtx)).toBe(true);
  });
});
