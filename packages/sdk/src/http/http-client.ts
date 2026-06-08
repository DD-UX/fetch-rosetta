export interface HttpClientOptions {
  baseUrl: string;
  /** Called before each request; return a token to send as a Bearer header. */
  getToken?: () => string | null;
}

/** Per-request options shared by every verb (e.g. cancellation). */
export interface RequestOptions {
  /** Abort the in-flight request when this signal fires. */
  signal?: AbortSignal;
}

export interface HttpClient {
  get: <T>(
    path: string,
    params?: Record<string, string | number>,
    options?: RequestOptions,
  ) => Promise<T>;
  post: <T, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions,
  ) => Promise<T>;
  put: <T, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions,
  ) => Promise<T>;
  delete: <T>(path: string, options?: RequestOptions) => Promise<T>;
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
    options?: RequestOptions,
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
      signal: options?.signal,
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText, url.toString());
    }

    return (await response.json()) as T;
  }

  return {
    get: (path, params, options) =>
      request("GET", path, params, undefined, options),
    post: (path, body, options) =>
      request("POST", path, undefined, body, options),
    put: (path, body, options) =>
      request("PUT", path, undefined, body, options),
    delete: (path, options) =>
      request("DELETE", path, undefined, undefined, options),
  };
}
