export interface HttpClientOptions {
  baseUrl: string;
  /** Called before each request; return a token to send as a Bearer header. */
  getToken?: () => string | null;
}

export interface HttpClient {
  get: <T>(path: string, params?: Record<string, string | number>) => Promise<T>;
  post: <T, B = unknown>(path: string, body: B) => Promise<T>;
  put: <T, B = unknown>(path: string, body: B) => Promise<T>;
  delete: <T>(path: string) => Promise<T>;
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string,
  ) {
    super(`HTTP ${status} ${statusText} — ${url}`);
    this.name = "HttpError";
  }
}

/**
 * Minimal typed fetch wrapper shared by every data-layer variant,
 * so all matrix cells talk to APIs the exact same way.
 */
export function createHttpClient(options: HttpClientOptions): HttpClient {
  const { baseUrl, getToken } = options;

  async function request<T>(
    method: string,
    path: string,
    params?: Record<string, string | number>,
    body?: unknown,
  ): Promise<T> {
    const url = new URL(path, baseUrl);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, String(value));
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const token = getToken?.();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText, url.toString());
    }

    return (await response.json()) as T;
  }

  return {
    get: (path, params) => request("GET", path, params),
    post: (path, body) => request("POST", path, undefined, body),
    put: (path, body) => request("PUT", path, undefined, body),
    delete: (path) => request("DELETE", path),
  };
}
