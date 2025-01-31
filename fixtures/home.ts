import { Locator, Page } from "@playwright/test";

export class Home {
  private readonly SearchBar: Locator;
  private SearchElement: Locator;

  constructor(public readonly page: Page) {
    this.SearchBar = page.getByPlaceholder("Search");
  }

  async goto() {
    await this.page.goto("https://pokemondb.net/");
  }

  async search(pokeName: string, pokeType: string = "") {
    await this.SearchBar.pressSequentially(pokeName, { delay: 100 });
    this.SearchElement = await this.page.getByRole("link", {
      name: `${pokeName}${pokeType ? " " + pokeType : ""}`,
    });
  }

  getSearchElement() {
    return this.SearchElement;
  }

  async gotToResult() {
    await this.SearchElement.click();
  }
}
