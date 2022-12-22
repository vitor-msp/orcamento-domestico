import { Client } from "pg";
import { Brand } from "../domain/Brand";
import { IRepository } from "./IRepository";

export type brandDB = {
  id: string;
  description: string;
};

export class BrandsRepository implements IRepository {
  constructor(private readonly db: Client) {}

  async save(entity: Brand): Promise<void> {
    const wasUpdated: boolean = await this.update(entity);
    if (wasUpdated) return;
    const wasInserted: boolean = await this.insert(entity);
    if (wasInserted) return;
    throw new Error("Error to save brand in the database.");
  }

  private async insert(entity: Brand): Promise<boolean> {
    const text: string = `INSERT INTO brand (id, description) VALUES ($1, $2);`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  private async update(entity: Brand): Promise<boolean> {
    const text: string = `UPDATE brand SET description = $2 WHERE id = $1;`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  async delete(id: string): Promise<void> {
    const text: string = `DELETE FROM brand WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query(text, values);
    if (res.rowCount !== 1) throw new Error("Brand not found.");
  }

  async get(id: string): Promise<brandDB> {
    const text: string = `SELECT id, description FROM brand WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query<brandDB>(text, values);
    if (res.rowCount !== 1) throw new Error("Brand not found.");
    return res.rows[0];
  }

  async getAll(): Promise<brandDB[]> {
    const text: string = `SELECT id, description FROM brand;`;
    const res = await this.db.query<brandDB[]>(text);
    //@ts-ignore
    return res.rows;
  }
}
