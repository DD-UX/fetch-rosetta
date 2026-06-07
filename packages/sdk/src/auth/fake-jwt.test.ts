import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createFakeJwt, decodeFakeJwt, isExpired } from "./fake-jwt";

describe("fake-jwt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("round-trips the payload through create and decode", () => {
    const token = createFakeJwt({ sub: "user-1", name: "Diego" });
    const payload = decodeFakeJwt(token);

    expect(payload).not.toBeNull();
    expect(payload?.sub).toBe("user-1");
    expect(payload?.name).toBe("Diego");
  });

  it("has a JWT-like three-segment structure", () => {
    const token = createFakeJwt({ sub: "user-1", name: "Diego" });
    expect(token.split(".")).toHaveLength(3);
  });

  it("sets iat to now and exp to now + ttl", () => {
    const token = createFakeJwt({ sub: "user-1", name: "Diego" }, 60);
    const payload = decodeFakeJwt(token);
    const now = Math.floor(Date.now() / 1000);

    expect(payload?.iat).toBe(now);
    expect(payload?.exp).toBe(now + 60);
  });

  it("is not expired before the ttl elapses", () => {
    const token = createFakeJwt({ sub: "user-1", name: "Diego" }, 60);
    expect(isExpired(token)).toBe(false);
  });

  it("expires after the ttl elapses", () => {
    const token = createFakeJwt({ sub: "user-1", name: "Diego" }, 60);
    vi.advanceTimersByTime(61_000);
    expect(isExpired(token)).toBe(true);
  });

  it("treats malformed tokens as expired", () => {
    expect(isExpired("not-a-token")).toBe(true);
    expect(decodeFakeJwt("a.b")).toBeNull();
  });
});
