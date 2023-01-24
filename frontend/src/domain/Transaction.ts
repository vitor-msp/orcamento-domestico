import { TransactionItem, TransactionItemApiType } from "./TransactionItem";

export type Transaction = {
  id?: string;
  enterprise?: string;
  date?: string;
  transactionItems?: TransactionItem[];
};

export type TransactionApiType = {
  id?: string;
  enterprise?: string;
  date?: string;
  items?: TransactionItemApiType[];
};
