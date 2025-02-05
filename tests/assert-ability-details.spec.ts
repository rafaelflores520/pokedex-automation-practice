import { test as Base } from "@playwright/test";
import { AbilityDetails } from "../fixtures/ability-details";

const mockAbility: Ability = {
  name: "Aroma Veil",
  pokemonsWith: [
    {
      isHidden: true,
      pokemon: {
        name: "spritzee",
        url: "https://pokeapi.co/api/v2/pokemon/682/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "aromatisse",
        url: "https://pokeapi.co/api/v2/pokemon/683/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "milcery",
        url: "https://pokeapi.co/api/v2/pokemon/868/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "alcremie",
        url: "https://pokeapi.co/api/v2/pokemon/869/",
      },
    },
    {
      isHidden: false,
      pokemon: {
        name: "lechonk",
        url: "https://pokeapi.co/api/v2/pokemon/915/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "dachsbun",
        url: "https://pokeapi.co/api/v2/pokemon/927/",
      },
    },
    {
      isHidden: false,
      pokemon: {
        name: "oinkologne",
        url: "https://pokeapi.co/api/v2/pokemon/10254/",
      },
    },
  ],
};

function filterPokemon(allPokemons: Array<PokemonWithAbility>) {
  return allPokemons.reduce<[PokemonWithAbility[], PokemonWithAbility[]]>(
    ([hidden, notHidden], elem) => {
      return elem.isHidden
        ? [hidden.concat(elem), notHidden]
        : [hidden, notHidden.concat(elem)];
    },
    [[], []]
  );
}

const test = Base.extend<{ abilityDetails: AbilityDetails }>({
  abilityDetails: async ({ page }, use) => {
    const abilitydetails = new AbilityDetails(page);
    await abilitydetails.goTo(mockAbility.name.replace(/\s/, "-"));
    use(abilitydetails);
  },
});

test("Verify Ability name is displayed", async ({ abilityDetails }) => {
  await abilityDetails.expectAbilityTitleToBeDisplayed(mockAbility.name);
});

test("Expect Pokemons with the Ability to exist", async ({
  abilityDetails,
}) => {
  const [hidden, notHidden] = filterPokemon(mockAbility.pokemonsWith);
  console.log("=====>" + hidden);
  console.log("=====>" + notHidden);
  //Assert pokemons with the ability as normal
  await abilityDetails.expectPokemonToHaveAbility(notHidden, false);
  //Assert pokemons with the ability as hidden
  await abilityDetails.expectPokemonToHaveAbility(hidden, true);
});
