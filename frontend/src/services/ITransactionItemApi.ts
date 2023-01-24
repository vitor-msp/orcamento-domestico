import { TransactionItem } from "../domain/TransactionItem";

export interface ITransactionItemApi {
  create(entity: TransactionItem): Promise<TransactionItem | null>;
  update(entity: TransactionItem): Promise<TransactionItem | null>;
  delete(entity: TransactionItem): Promise<void | null>;
}
