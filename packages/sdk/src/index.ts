export { createHttpClient } from "./http/http-client";
export type { HttpClient, HttpClientOptions } from "./http/http-client";

export { createFakeJwt, decodeFakeJwt, isExpired } from "./auth/fake-jwt";
export type { FakeJwtPayload } from "./auth/fake-jwt";

export * from "./models";

/** Smoke-test helper to prove the SDK is wired into an app. */
export function sdkInfo(): { name: string; version: string } {
  return { name: "@fetch-rosetta/sdk", version: "0.1.0" };
}
