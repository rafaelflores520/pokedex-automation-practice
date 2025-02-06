import { test as Base } from "@playwright/test";
import { AbilityDetails } from "../fixtures/ability-details";
import { getAbility } from "../utils/pokeApi";

let ability: Ability;

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
    //Need to Clarify the required test data
    const apiFriendlyAbility = "Aroma Veil".replace(/\s/, "-");
    const abilitydetails = new AbilityDetails(page);
    ability = await getAbility(apiFriendlyAbility);
    console.log(ability);
    await abilitydetails.goTo(ability.name);
    use(abilitydetails);
  },
});

test("Verify Ability name is displayed", async ({ abilityDetails }) => {
  await abilityDetails.expectAbilityTitleToBeDisplayed(ability.name);
});

test.fixme(
  "Expect Pokemons with the Ability to exist",
  async ({ abilityDetails }) => {
    const [hidden, notHidden] = filterPokemon(ability.pokemonsWith);
    //Assert pokemons with the ability as normal
    await abilityDetails.expectPokemonToHaveAbility(notHidden, false);
    //Assert pokemons with the ability as hidden
    await abilityDetails.expectPokemonToHaveAbility(hidden, true);
  }
);
