import { test as Base } from "@playwright/test";
import { MoveDetails } from "../fixtures/move-details";
import { mockMove } from "../utils/mockData";

const test = Base.extend<{ moveDetails: MoveDetails }>({
  moveDetails: async ({ page }, use) => {
    const moveDetails = new MoveDetails(page);
    await moveDetails.goTo(mockMove.name);
    use(moveDetails);
  },
});

test("Verify Move name is displayed", async ({ moveDetails }) => {
  await moveDetails.expectTitleToMatch(mockMove.name);
});

test("Verify Type is correct and displayed", async ({ moveDetails }) => {
  await moveDetails.expectTypeToMatch(mockMove.type);
});

test("Verify that the correct pokemons learn the Move", async ({
  moveDetails,
}) => {
  await moveDetails.expectPokemomnsToLearnMove(mockMove.pokemonWithMove);
});
