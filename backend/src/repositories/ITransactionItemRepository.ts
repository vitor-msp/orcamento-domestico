import { TransactionItem } from "../domain/TransactionItem";

export interface ITransactionItemRepository {
  save(entity: TransactionItem): Promise<void>;
  delete(id: string): Promise<void>;
}
