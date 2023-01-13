import { Transaction } from "../domain/Transaction";

export interface ITransactionApi {
  create(entity: Transaction): Promise<Transaction>;
  update(id: string, entity: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
  get(entity: Transaction): Promise<Transaction>;
}
