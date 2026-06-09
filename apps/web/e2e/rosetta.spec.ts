import { expect, test, type Page } from "@playwright/test";

const charactersPayload = {
  info: { count: 2, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [],
      url: "",
      created: "",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      episode: [],
      url: "",
      created: "",
    },
  ],
};

test.describe("rosetta variants", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/rosetta");
  });

  const csrCard = (page: Page) =>
    page.getByRole("listitem").filter({ hasText: "CSR fetch" });

  test("lists the fetch variants with a live CSR card", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Fetch variants" }),
    ).toBeVisible();
    await expect(page.getByText("CSR fetch")).toBeVisible();
    await expect(
      csrCard(page).getByRole("link", { name: "Open variant" }),
    ).toBeVisible();
    await expect(page.getByText("Coming soon").first()).toBeVisible();
  });

  test("opens the CSR variant and renders fetched characters", async ({
    page,
  }) => {
    await page.route("**/api/character*", (route) =>
      route.fulfill({ json: charactersPayload }),
    );

    await csrCard(page).getByRole("link", { name: "Open variant" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "CSR fetch" }),
    ).toBeVisible();
    await expect(page.getByText("Rick Sanchez")).toBeVisible();
    await expect(page.getByText("Morty Smith")).toBeVisible();
  });

  test("shows an error state when the character API fails", async ({
    page,
  }) => {
    await page.route("**/api/character*", (route) =>
      route.fulfill({ status: 500, json: { error: "boom" } }),
    );

    await page.goto("/rosetta/csr-fetch");

    await expect(page.getByText("Couldn't load characters")).toBeVisible();
  });
});
