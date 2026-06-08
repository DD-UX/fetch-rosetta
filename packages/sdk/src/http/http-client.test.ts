import { afterEach, describe, expect, it, vi } from "vitest";
import { createHttpClient, HttpError } from "./http-client";

function mockFetchOnce(
  body: unknown,
  init?: { ok?: boolean; status?: number },
) {
  const response = {
    ok: init?.ok ?? true,
    status: init?.status ?? 200,
    statusText: init?.ok === false ? "Error" : "OK",
    json: () => Promise.resolve(body),
  } as Response;
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("createHttpClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("GETs from baseUrl + path with query params", async () => {
    const fetchMock = mockFetchOnce({ items: [] });
    const client = createHttpClient({ baseUrl: "https://api.example.com" });

    await client.get("/products", { q: "phone", limit: 10 });

    const url = fetchMock.mock.calls[0]?.[0] as URL;
    expect(url.toString()).toBe(
      "https://api.example.com/products?q=phone&limit=10",
    );
  });

  it("sends a Bearer header when getToken returns a token", async () => {
    const fetchMock = mockFetchOnce({});
    const client = createHttpClient({
      baseUrl: "https://api.example.com",
      getToken: () => "token-123",
    });

    await client.get("/me");

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer token-123",
    );
  });

  it("omits the Authorization header without a token", async () => {
    const fetchMock = mockFetchOnce({});
    const client = createHttpClient({ baseUrl: "https://api.example.com" });

    await client.get("/me");

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(
      (init.headers as Record<string, string>).Authorization,
    ).toBeUndefined();
  });

  it("JSON-serializes POST bodies", async () => {
    const fetchMock = mockFetchOnce({ id: 1 });
    const client = createHttpClient({ baseUrl: "https://api.example.com" });

    await client.post("/products", { title: "Phone" });

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ title: "Phone" }));
  });

  it("throws a typed HttpError on non-ok responses", async () => {
    mockFetchOnce({}, { ok: false, status: 404 });
    const client = createHttpClient({ baseUrl: "https://api.example.com" });

    const promise = client.get("/missing");

    await expect(promise).rejects.toBeInstanceOf(HttpError);
    await expect(client.get("/missing")).rejects.toMatchObject({
      status: 404,
    });
  });
});
