import { TransactionItem } from "../domain/TransactionItem";

export interface ITransactionItemApi {
  create(entity: TransactionItem): Promise<TransactionItem>;
  update(id: string, entity: TransactionItem): Promise<TransactionItem>;
  delete(id: string): Promise<void>;
}
