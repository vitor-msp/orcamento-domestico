import { Item } from "../domain/Item";
import { IItemApi } from "./IItemApi";

export class ItemApi implements IItemApi {
  async create(entity: Item): Promise<string> {
    alert(`created in backend: ${entity.description}`);
    const id = Math.floor(Math.random() * 1000).toString();
    return id;
  }

  async update(id: string, entity: Item): Promise<void> {
    alert(`updated in backend: ${id} ${entity.description}`);
  }

  async delete(id: string): Promise<void> {
    alert(`deleted in backend: ${id}`);
  }

  async getAll(): Promise<Item[]> {
    return [
      { id: "1", description: "Citopharma" },
      { id: "2", description: "Autentica" },
      { id: "3", description: "Cemig" },
      { id: "4", description: "Tim" },
    ];
  }
}
