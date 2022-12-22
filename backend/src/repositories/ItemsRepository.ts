import { Client } from "pg";
import { Item } from "../domain/Item";
import { IRepository } from "./IRepository";

export class ItemsRepository implements IRepository {
  constructor(private readonly db: Client) {}

  async save(entity: Item): Promise<void> {
    const text: string = `INSERT INTO items(id, description) VALUES ($1, $2);`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    try {
      const res = await this.db.query(text, values);
      if (res.rowCount !== 1) throw new Error(`Error to insert item in database.`);
    } catch (error) {
      throw new Error(`Error to execute query in database - ${error}`);
    }
  }

  delete(id: string): void {
    throw new Error("Method not implemented.");
  }
  get(id: string) {
    throw new Error("Method not implemented.");
  }
  getAll(): any[] {
    throw new Error("Method not implemented.");
  }
}
