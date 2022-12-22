import { Client } from "pg";
import { Item } from "../domain/Item";
import { IRepository } from "./IRepository";

export type itemDB = {
  id: string;
  description: string;
};

export class ItemsRepository implements IRepository {
  constructor(private readonly db: Client) {}

  async save(entity: Item): Promise<void> {
    const wasUpdated: boolean = await this.update(entity);
    if (wasUpdated) return;
    const wasInserted: boolean = await this.insert(entity);
    if (wasInserted) return;
    throw new Error("Error to save item in the database.");
  }

  private async insert(entity: Item): Promise<boolean> {
    const text: string = `INSERT INTO items (id, description) VALUES ($1, $2);`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  private async update(entity: Item): Promise<boolean> {
    const text: string = `UPDATE items SET description = $2 WHERE id = $1;`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  async delete(id: string): Promise<void> {
    const text: string = `DELETE FROM items WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query(text, values);
    if (res.rowCount !== 1)
      throw new Error("Error to delete item in the database.");
  }

  async get(id: string): Promise<itemDB> {
    const text: string = `SELECT id, description FROM items WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query<itemDB>(text, values);
    return res.rows[0];
  }

  async getAll(): Promise<Item[]> {
    throw new Error("Method not implemented.");
  }
}
