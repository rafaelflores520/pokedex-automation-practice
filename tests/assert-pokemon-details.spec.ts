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
    const pokemonDetails = new PokemonDetails(page);
    await pokemonDetails.goTo(mockData.name);
    use(pokemonDetails);
  },
});

test("Verificar el nombre del Pokemon", async ({ pokemonDetails }) => {
  await pokemonDetails.expectPokeTitleDisplayed(mockData.name);
});

test("Verificar el id Nacional", async ({ pokemonDetails }) => {
  await pokemonDetails.expectNationalIdToMatch(mockData.id);
});

test("Verificar el/los tipos del Pokemon", async ({ pokemonDetails }) => {
  await pokemonDetails.expectPokeTypeToMatch(mockData.type);
});

test("Verificar las habilidades del pokemon", async ({ pokemonDetails }) => {
  await pokemonDetails.expectPokeAbilitiesToMatch(mockData.abilities);
});
