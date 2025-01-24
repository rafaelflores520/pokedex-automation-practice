import { Locator, Page } from "@playwright/test";

export class PokemonDetails {
  private readonly _pokeTitle: string;
  private readonly _pokeImage: RegExp;
  private readonly _pokeType: string;
  private readonly _pokeName: string;
  private readonly _pokePath: string;

  constructor(readonly page: Page, pokeInfo: Pokemon) {
    this._pokePath = `pokedex/${pokeInfo.name}`;
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

  get pokePath() {
    return this._pokePath;
  }

  //   get pokeNationalId(){
  //     return this.page.get
  //   }

  get pokeTitle() {
    return this.page.getByRole("heading", {
      name: this._pokeName,
      exact: true,
    });
  }

  get pokeType() {
    return this.page.getByRole("row", { name: this._pokeType });
  }

  get pokeImage() {
    return this.page.getByRole("img", { name: this._pokeImage });
  }

  get pokeAbilities() {
    return this.page
      .getByRole("row", { name: /Abilities/ })
      .locator(".text-muted")
      .all();
  }
}
