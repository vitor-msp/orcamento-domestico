import { Item } from "../domain/Item";
import { IItemApi } from "./IItemApi";

export class EnterpriseApi implements IItemApi {
  async create(entity: Item): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, entity: Item): Promise<void> {
    throw new Error("Method not implemented.");
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
