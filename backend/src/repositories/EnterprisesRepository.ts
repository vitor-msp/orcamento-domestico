import { Client } from "pg";
import { Enterprise } from "../domain/Enterprise";
import { IRepository } from "./IRepository";

export type enterpriseDB = {
  id: string;
  description: string;
};

export class EnterprisesRepository implements IRepository {
  constructor(private readonly db: Client) {}

  async save(entity: Enterprise): Promise<void> {
    const wasUpdated: boolean = await this.update(entity);
    if (wasUpdated) return;
    const wasInserted: boolean = await this.insert(entity);
    if (wasInserted) return;
    throw new Error("Error to save enterprise in the database.");
  }

  private async insert(entity: Enterprise): Promise<boolean> {
    const text: string = `INSERT INTO enterprise (id, description) VALUES ($1, $2);`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  private async update(entity: Enterprise): Promise<boolean> {
    const text: string = `UPDATE enterprise SET description = $2 WHERE id = $1;`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  async delete(id: string): Promise<void> {
    const text: string = `DELETE FROM enterprise WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query(text, values);
    if (res.rowCount !== 1) throw new Error("Enterprise not found.");
  }

  async get(id: string): Promise<enterpriseDB> {
    const text: string = `SELECT id, description FROM enterprise WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query<enterpriseDB>(text, values);
    if (res.rowCount !== 1) throw new Error("Enterprise not found.");
    return res.rows[0];
  }

  async getAll(): Promise<enterpriseDB[]> {
    const text: string = `SELECT id, description FROM enterprise;`;
    const res = await this.db.query<enterpriseDB[]>(text);
    //@ts-ignore
    return res.rows;
  }
}
