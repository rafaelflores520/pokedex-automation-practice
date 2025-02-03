import { test as Base } from "@playwright/test";
import { MoveDetails } from "../fixtures/move-details";

const mockMove: Move = {
  name: "Attract",
  type: {
    name: "normal",
  },
  pokemonWithMove: [
    {
      name: "Milotic",
    },
    {
      name: "Luvdisc",
    },
    {
      name: "Finneon",
    },
    {
      name: "Lumineon",
    },
    {
      name: "Vullaby",
    },
    {
      name: "Mandibuzz",
    },
    {
      name: "Milcery",
    },
    {
      name: "Alcremie",
    },
    {
      name: "Frosmoth",
    },
    {
      name: "Fezandipiti",
    },
    {
      name: "Illumise",
    },
    {
      name: "Oricorio",
    },
    {
      name: "Oricorio",
    },
    {
      name: "Oricorio",
    },
    {
      name: "Oricorio",
    },
  ],
};

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
