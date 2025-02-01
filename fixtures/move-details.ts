import { expect, Page } from "@playwright/test";
import { MinimalPage } from "../Interfaces/page";
import exp from "constants";

export class MoveDetails implements MinimalPage {
  constructor(private readonly page: Page) {}

  public async goTo(path: string) {
    await this.page.goto(`move/${path.toLocaleLowerCase()}`, {
      waitUntil: "domcontentloaded",
    });
  }

  public async expectTitleToMatch(moveTitle: string) {
    const fetchedTitle = await this.page
      .getByRole("heading")
      .filter({ has: this.page.locator(".text-muted", { hasText: "(move)" }) });
    await expect(fetchedTitle).toContainText(moveTitle);
  }

  public async expectTypeToMatch(moveType: Type) {
    const fetechedType = await this.page
      .getByRole("row", { name: /Type/ })
      .getByRole("link", { name: /\w+/ });
    await expect(
      fetechedType,
      `Expect ${await fetechedType.textContent()} to be exactly "${
        moveType.name
      }"` //It's possible to name steps
    ).toHaveText(moveType.name, {
      ignoreCase: true,
    });
  }
}
