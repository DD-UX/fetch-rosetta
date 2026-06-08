import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the heading and SDK badge", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Fetch Rosetta" }),
    ).toBeVisible();
    await expect(
      page.getByText(/SDK wired: @fetch-rosetta\/sdk/),
    ).toBeVisible();
  });

  test("shows the hero with data-fetching variant chips", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Fetch Rosetta" }),
    ).toBeVisible();
    await expect(page.getByText("Zustand")).toBeVisible();
    await expect(page.getByText("TanStack Query")).toBeVisible();
    await expect(page.getByText("SWR")).toBeVisible();
  });

  test("switches tabs in the showcase", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Component showcase")).toBeVisible();

    await page.getByRole("tab", { name: "About" }).click();

    await expect(page.getByText("Why a shared kit?")).toBeVisible();
    await expect(page.getByText("Component showcase")).not.toBeVisible();
  });
});
