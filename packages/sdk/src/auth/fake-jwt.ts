export interface FakeJwtPayload {
  sub: string;
  name: string;
  /** Issued at (unix seconds). */
  iat: number;
  /** Expiry (unix seconds). */
  exp: number;
}

function encode(value: unknown): string {
  return btoa(JSON.stringify(value))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decode<T>(segment: string): T {
  const padded = segment.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(padded)) as T;
}

/**
 * Creates a structurally valid but cryptographically FAKE JWT.
 * Good enough to exercise auth flows (storage, headers, expiry,
 * refresh) without a real identity provider. Never use in production.
 */
export function createFakeJwt(
  user: { sub: string; name: string },
  ttlSeconds = 60 * 15,
): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "none", typ: "JWT" };
  const payload: FakeJwtPayload = {
    ...user,
    iat: now,
    exp: now + ttlSeconds,
  };
  return `${encode(header)}.${encode(payload)}.fake-signature`;
}

export function decodeFakeJwt(token: string): FakeJwtPayload | null {
  const segments = token.split(".");
  const payload = segments[1];
  if (!payload) {
    return null;
  }
  try {
    return decode<FakeJwtPayload>(payload);
  } catch {
    return null;
  }
}

export function isExpired(token: string): boolean {
  const payload = decodeFakeJwt(token);
  if (!payload) {
    return true;
  }
  return payload.exp <= Math.floor(Date.now() / 1000);
}
