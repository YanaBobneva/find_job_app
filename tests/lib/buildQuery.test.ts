import { describe, expect, it } from "vitest";
import { buildQuery } from "~/lib/buildQuery";

describe("buildQuery", () => {
  it("returns root path when all filters are empty", () => {
    expect(buildQuery({ city: "", experience: "", job: "" })).toBe("/");
  });

  it("includes only non-empty filters", () => {
    expect(buildQuery({ city: "Moscow", experience: "", job: "" })).toBe(
      "/?city=Moscow"
    );
    expect(buildQuery({ city: "", experience: "middle", job: "" })).toBe(
      "/?experience=middle"
    );
    expect(buildQuery({ city: "", experience: "", job: "frontend" })).toBe(
      "/?job=frontend"
    );
  });

  it("builds full query when all filters are filled", () => {
    expect(
      buildQuery({ city: "SPB", experience: "senior", job: "devops" })
    ).toBe("/?city=SPB&experience=senior&job=devops");
  });
});
