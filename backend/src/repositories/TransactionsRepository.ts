import { Client } from "pg";
import { Transaction } from "../domain/Transaction";
import { FormatDateToPG } from "../helpers/FormatDateToPG";
import { ITransactionRepository } from "./ITransactionRepository";

export type transactionDB = {
  id: string;
  enterprise: string;
  date: string;
};

export class TransactionsRepository implements ITransactionRepository {
  constructor(private readonly db: Client) {}

  async save(entity: Transaction): Promise<void> {
    const wasUpdated: boolean = await this.update(entity);
    if (wasUpdated) return;
    const wasInserted: boolean = await this.insert(entity);
    if (wasInserted) return;
    throw new Error("Error to save transaction in the database.");
  }

  private async insert(entity: Transaction): Promise<boolean> {
    const text: string = `INSERT INTO transaction (id, enterprise, date) VALUES ($1, $2, $3);`;
    const values: string[] = [
      entity.getId(),
      entity.getEnterprise()!.getId(),
      FormatDateToPG.format(entity.getDate()!),
    ];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  private async update(entity: Transaction): Promise<boolean> {
    const text: string = `UPDATE transaction SET enterprise = $2, date = $3 WHERE id = $1;`;
    const values: string[] = [
      entity.getId(),
      entity.getEnterprise()!.getId(),
      FormatDateToPG.format(entity.getDate()!),
    ];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  async exists(enterpriseID: string, date: Date): Promise<boolean> {
    const text: string = `SELECT id FROM transaction WHERE enterprise = $1 AND date = $2;`;
    const values: string[] = [enterpriseID, FormatDateToPG.format(date)];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  async get(id: string): Promise<transactionDB> {
    const text: string = `SELECT id, enterprise, date FROM transaction WHERE id = $1;`;
    const values: string[] = [id];
    const res = await this.db.query<transactionDB>(text, values);
    if (res.rowCount !== 1) throw new Error("Item not found.");
    return res.rows[0];
  }
  // // to edit
  // async delete(id: string): Promise<void> {
  //   const text: string = `DELETE FROM items WHERE id = $1;`;
  //   const values: string[] = [id];
  //   const res = await this.db.query(text, values);
  //   if (res.rowCount !== 1) throw new Error("Item not found.");
  // }
}
