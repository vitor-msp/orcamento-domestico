import { Transaction } from "../domain/Transaction";

export interface ITransactionApi {
  create(entity: Transaction): Promise<Transaction | null>;
  update(entity: Transaction): Promise<Transaction | null>;
  delete(entity: Transaction): Promise<void | null>;
  get(entity: Transaction): Promise<Transaction | null>;
}
