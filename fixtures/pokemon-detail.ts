import { Locator, Page } from "@playwright/test";

export class PokemonDetails {
  private readonly _pokeTitle: string;
  private readonly _pokeImage: RegExp;
  private readonly _pokeType: string;
  private readonly _pokeName: string;

  constructor(readonly page: Page, pokeInfo: Pokemon) {
    this._pokeName = pokeInfo.name;
    this._pokeImage = new RegExp(
      String.raw`${pokeInfo.name}.+Ken Sugimori`,
      "g"
    );
    this._pokeType = `Type ${pokeInfo.type
      .map((elem) => {
        return elem.name;
      })
      .join(" ")}`;
  }

  get pokeNationalId() {
    return this.page
      .getByRole("row", { name: /National/ })
      .getByRole("cell", { name: /\d+/ });
  }

  get findPokeTitle() {
    return this.page.getByRole("heading", {
      name: this._pokeName,
      exact: true,
    });
  }

  get findPokeType() {
    return this.page.getByRole("row", { name: this._pokeType });
  }

  get findPokeImage() {
    return this.page.getByRole("img", { name: this._pokeImage });
  }

  get pokeAbilities() {
    return this.page
      .getByRole("row", { name: /Abilities/ })
      .locator(".text-muted")
      .all();
  }
}
