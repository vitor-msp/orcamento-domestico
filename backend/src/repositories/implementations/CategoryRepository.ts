import { Client } from "pg";
import { Category } from "../../domain/Category";
import { categoryDB, ICategoryRepository } from "../interfaces/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly db: Client) {}

  async save(entity: Category): Promise<void> {
    const wasUpdated: boolean = await this.update(entity);
    if (wasUpdated) return;
    const wasInserted: boolean = await this.insert(entity);
    if (wasInserted) return;
    throw new Error("Error to save category in the database.");
  }

  private async insert(entity: Category): Promise<boolean> {
    const text: string = `INSERT INTO category (id, description) VALUES ($1, $2);`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  private async update(entity: Category): Promise<boolean> {
    const text: string = `UPDATE category SET description = $2 WHERE id = $1;`;
    const values: string[] = [entity.getId(), entity.getDescription()];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  async delete(id: string): Promise<void> {
    const text: string = `DELETE FROM category WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query(text, values);
    if (res.rowCount !== 1) throw new Error("Category not found.");
  }

  async get(id: string): Promise<categoryDB> {
    const text: string = `SELECT id, description FROM category WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query<categoryDB>(text, values);
    if (res.rowCount !== 1) throw new Error("Category not found.");
    return res.rows[0];
  }

  async getAll(): Promise<categoryDB[]> {
    const text: string = `SELECT id, description FROM category;`;
    const res = await this.db.query<categoryDB[]>(text);
    //@ts-ignore
    return res.rows;
  }
}
