import { Item } from "../../domain/Item";

export type itemDB = {
  id: string;
  description: string;
};

export interface IItemRepository {
  save(entity: Item): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<itemDB>;
  getAll(): Promise<itemDB[]>;
}
