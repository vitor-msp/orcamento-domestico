import { Transaction } from "../domain/Transaction";
import { ITransactionApi } from "./ITransactionApi";

export class TransactionApi implements ITransactionApi {
  async create(entity: Transaction): Promise<Transaction> {
    entity.id = "1";
    console.log(entity);
    return entity;
  }

  async update(id: string, entity: Transaction): Promise<Transaction> {
    console.log(entity);
    return entity;
  }

  async delete(id: string): Promise<void> {}

  async get(entity: Transaction): Promise<Transaction> {
    return { id: "1",enterprise: "1", date: "" };
  }
}
