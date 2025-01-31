import { test as Base, expect } from "@playwright/test";
import { Home } from "../fixtures/home";

const test = Base.extend<{ home: Home }>({
  home: async ({ page }, use) => {
    const home = new Home(page);
    await home.goto();
    await use(home);
  },
});

test("Buscar un pokemon", async ({ home }) => {
  await home.search("Charizard", "Pokedex");
  expect(home.getSearchElement()).toBeVisible();
  await home.gotToResult();
});

test("Buscar una habilidad", async ({ home }) => {
  await home.search("Shield Dust", "Ability");
  expect(home.getSearchElement()).toBeVisible();
  await home.gotToResult();
});

test("Buscar un item", async ({ home }) => {
  await home.search("Choice Scarf", "Item");
  expect(home.getSearchElement()).toBeVisible();
  await home.gotToResult();
});
