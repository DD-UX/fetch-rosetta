import { expect, test } from "@playwright/test";

/**
 * The SSR variant fetches on the server, so Playwright's browser-level
 * `page.route` cannot intercept it the way the CSR spec does. The success
 * path therefore exercises the real Rick & Morty API and asserts the list is
 * server-rendered. The server-side error path can't be forced from the
 * browser, so it is covered by unit tests (CharacterList + the helper).
 */
test.describe("ssr fetch variant", () => {
  test("links the SSR card from the variants index", async ({ page }) => {
    await page.goto("/rosetta");
    await expect(page.getByText("SSR fetch")).toBeVisible();
  });

  test("server-renders the character list from the live API", async ({
    page,
  }) => {
    await page.goto("/rosetta/ssr-fetch");

    await expect(
      page.getByRole("heading", { level: 1, name: "SSR fetch" }),
    ).toBeVisible();

    // Page 1 of the public API always starts with these two characters.
    await expect(page.getByText("Rick Sanchez")).toBeVisible();
    await expect(page.getByText("Morty Smith")).toBeVisible();
  });

  test("ships the characters in the initial HTML (no client fetch)", async ({
    request,
  }) => {
    // Hitting the server directly (not the browser) proves the list is in the
    // server-rendered markup rather than fetched after hydration.
    const response = await request.get("/rosetta/ssr-fetch");
    expect(response.ok()).toBeTruthy();
    const html = await response.text();
    expect(html).toContain("Rick Sanchez");
  });
});
