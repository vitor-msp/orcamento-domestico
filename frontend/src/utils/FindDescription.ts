import { repository } from "..";

export abstract class FindDescription {
  public static of(itemName: string, id: string): string {
    const item = repository.get(itemName).find((item) => item.id === id);
    if (item) return item.description;
    return "";
  }
}
