import { TransactionItem } from "../../domain/TransactionItem";

export type transactionItemDB = {
  id: string;
  transaction: string;
  item: string;
  brand: string;
  category: string;
  quantity: number;
  unitOfMeasurement: string;
  totalValue: number;
};

export interface ITransactionItemRepository {
  save(entity: TransactionItem): Promise<void>;
  get(id: string): Promise<transactionItemDB>;
  delete(id: string): Promise<void>;
}
