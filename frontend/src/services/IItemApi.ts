import { Item } from "../domain/Item";

export interface IItemApi {
  create(entity: Item): Promise<string>;
  update(id: string, entity: Item): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Item[]>;
}
