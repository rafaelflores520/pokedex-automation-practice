import { test as Base, expect } from "@playwright/test";
import { PokemonDetails } from "../fixtures/pokemon-detail";
import { getPokemon } from "../utils/pokeApi";

let pokemon: Pokemon;

const test = Base.extend<{ pokemonDetails: PokemonDetails }>({
  pokemonDetails: async ({ page }, use) => {
    //Need to Clarify the required test data
    pokemon = await getPokemon("Kommo-o");
    console.log(pokemon);
    const pokemonDetails = new PokemonDetails(page);
    await pokemonDetails.goTo(pokemon.name);
    use(pokemonDetails);
  },
});

test("Verificar el nombre del Pokemon", async ({ pokemonDetails }) => {
  await pokemonDetails.expectPokeTitleDisplayed(pokemon.name);
});

test("Verificar el id Nacional", async ({ pokemonDetails }) => {
  await pokemonDetails.expectNationalIdToMatch(pokemon.id);
});

test("Verificar el/los tipos del Pokemon", async ({ pokemonDetails }) => {
  await pokemonDetails.expectPokeTypeToMatch(pokemon.type);
});

test("Verificar las habilidades del pokemon", async ({ pokemonDetails }) => {
  await pokemonDetails.expectPokeAbilitiesToMatch(pokemon.abilities);
});
