import { Locator, Page, expect } from "@playwright/test";
import { MinimalPage } from "../Interfaces/page";

export class PokemonDetails implements MinimalPage {
  constructor(private readonly page: Page) {}

  public async goTo(path: string) {
    await this.page.goto(`pokedex/${path.toLocaleLowerCase()}`, {
      waitUntil: "domcontentloaded",
    });
  }

  public async expectNationalIdToMatch(pokeId: number) {
    const fetchedId = await this.page
      .getByRole("row", { name: /National/ })
      .getByRole("cell", { name: /\d+/ });

    await expect(fetchedId).toContainText(pokeId.toString());
  }

  public async expectPokeTitleDisplayed(pokeName: string) {
    const fetchedName = await this.page.getByRole("heading", {
      name: new RegExp(pokeName, "i"),
      level: 1,
    });
    await expect(fetchedName).toBeVisible();
  }

  public async expectPokeTypeToMatch(pokeTypes: Array<Type>) {
    const fetchedTypes = await this.page
      .getByRole("row", { name: /Type/ })
      .getByRole("link")
      .all();
    for (let i = 0; i < fetchedTypes.length; i++) {
      await expect(fetchedTypes[i]).toContainText(pokeTypes[i].name, {
        ignoreCase: true,
      });
    }
  }

  public async expectPokeImageDisplayed(pokeName: string) {
    const fetchedImage = await this.page.getByRole("img", {
      name: new RegExp(String.raw`${pokeName}.+Ken Sugimori`, "g"),
    });
    await expect(fetchedImage).toBeVisible();
  }

  //Refactor to utilize toContainText() feature to assert multiple locators
  public async expectPokeAbilitiesToMatch(pokeAbilities: Array<PokeAbility>) {
    const fetchedAbilities = await this.page
      .getByRole("row", { name: /Abilities/ })
      .locator(".text-muted");
    await expect(fetchedAbilities).toContainText(
      pokeAbilities.map<string>((elem) => {
        return elem.name;
      }),
      { ignoreCase: true }
    );
  }
}
