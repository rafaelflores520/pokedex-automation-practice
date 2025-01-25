import { test as Base, expect } from "@playwright/test";
import { PokemonDetails } from "../fixtures/pokemon-detail";

const mockData: Pokemon = {
  name: "Kommo-o",
  id: 784,
  type: [{ name: "Dragon" }, { name: "Fighting" }],
  abilities: [
    { name: "Bulletproof", isHidden: false },
    { name: "Soundproof", isHidden: false },
    { name: "Overcoat", isHidden: true },
  ],
};

const test = Base.extend<{ pokemonDetails: PokemonDetails }>({
  pokemonDetails: async ({ page }, use) => {
    //Mockdata is temporal, ideally want to use an API calll to pokeApi
    const pokemonDetails = new PokemonDetails(page, mockData);
    await page.goto(`pokedex/${mockData.name.toLocaleLowerCase()}`, {
      waitUntil: "domcontentloaded",
    });
    use(pokemonDetails);
  },
});

test(
  "Verificar el nombre del Pokemon",
  { tag: "@AssertPokemon" },
  async ({ pokemonDetails }) => {
    await expect(pokemonDetails.findPokeTitle).toBeVisible();
  }
);

test(
  "Verificar el id Nacional",
  { tag: "@AssertPokemon" },
  async ({ pokemonDetails }) => {
    const nationalIdText = await pokemonDetails.pokeNationalId.textContent();
    if (nationalIdText !== null) {
      await expect(Number.parseInt(nationalIdText)).toEqual(mockData.id);
    } else {
      throw new Error("National ID text content is null");
    }
  }
);

test("Verificar el/los tipos del Pokemon", async ({ pokemonDetails }) => {
  await expect(pokemonDetails.findPokeType).toBeVisible();
});

// test("Verificar las habilidades del pokemon", async ({ pokemonDetails }) => {
//   const abilities = await pokemonDetails.pokeAbilities;
//   console.log(abilities.length);
//   for (let i = 0; i < abilities.length; i++) {
//     await expect(abilities[i]).toHaveText(mockData.abilities[i].name);
//   }
// });
