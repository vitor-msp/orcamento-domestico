import { Item } from "./Item";

export type TransactionItem = {
  id?: string;
  transaction?: string;
  item?: Item;
  brand?: Item;
  category?: Item;
  quantity?: number;
  unitOfMeasurement?: string;
  totalValue?: number;
};

export type TransactionItemApiType = {
  id?: string;
  transaction?: string;
  item?: string;
  brand?: string;
  category?: string;
  quantity?: number;
  unitofmeasurement?: string;
  totalvalue?: number;
};
