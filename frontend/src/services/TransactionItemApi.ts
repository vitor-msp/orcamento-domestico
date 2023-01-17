import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "./ITransactionItemApi";

export class TransactionItemApi implements ITransactionItemApi {
  async create(entity: TransactionItem): Promise<TransactionItem> {
    return entity;
  }

  async update(id: string, entity: TransactionItem): Promise<TransactionItem> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
