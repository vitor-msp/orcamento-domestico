import { Item } from "../domain/Item";

export interface IItemApi {
  create(entity: Item): Promise<Item | null>;
  update(entity: Item): Promise<Item | null>;
  delete(entity: Item): Promise<void | null>;
  getAll(): Promise<Item[] | null>;
}
