import { TransactionItem } from "./TransactionItem";

export type Transaction = {
  id?: string;
  enterprise?: string;
  date?: string;
  transactionItems?: TransactionItem[];
};
