import { expect, Page } from "@playwright/test";
import { MinimalPage } from "../Interfaces/page";

export class AbilityDetails implements MinimalPage {
  constructor(private readonly page: Page) {}

  public async goTo(path: string) {
    await this.page.goto(`ability/${path.toLocaleLowerCase()}`, {
      waitUntil: "domcontentloaded",
    });
  }

  public async expectAbilityTitleToBeDisplayed(abilityName: string) {
    const fetchedTitle = this.page.getByRole("heading").filter({
      has: this.page.locator(".text-muted", { hasText: "(ability)" }),
    });
    await expect(fetchedTitle).toContainText(abilityName.replace("-", " "), {
      ignoreCase: true,
    });
  }

  public async expectPokemonToHaveAbility(
    pokemonsWithAbility: Array<PokemonWithAbility>,
    hidden: boolean
  ) {
    console.log(pokemonsWithAbility);
    const fetchedPokemonsNotHidden = await this.page
      .getByRole("table")
      .filter({
        has: this.page.getByRole("cell", {
          name: hidden ? "Other abilities" : "Hidden ability",
        }),
      })
      .locator(".ent-name");

    await expect(
      fetchedPokemonsNotHidden,
      `Expect pokemon with this ${
        hidden ? "Hidden" : "Normal"
      } ability to exist`
    ).toContainText(
      pokemonsWithAbility.map<string>((elem) => elem.pokemon.name),
      { ignoreCase: true }
    );
  }
}
