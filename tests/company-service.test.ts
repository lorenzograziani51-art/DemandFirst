import { describe, expect, it } from "vitest";
import { CompanyService } from "@/domain/company/service";
import { newInternalCompanyId } from "@/domain/company/id";

describe("company foundation rules", () => {
  const service = new CompanyService();

  it("generates an internal company id immediately with expected prefix", () => {
    const id = newInternalCompanyId();
    expect(id.startsWith("cmp_")).toBe(true);
    expect(id.length).toBeGreaterThan(12);
  });

  it("supports constrained company status transitions", () => {
    expect(service.canTransitionCompanyStatus("draft", "pending_review")).toBe(true);
    expect(service.canTransitionCompanyStatus("active", "pending_review")).toBe(false);
    expect(service.canTransitionCompanyStatus("suspended", "active")).toBe(true);
  });
});
