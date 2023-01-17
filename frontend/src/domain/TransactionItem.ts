import { Item } from "./Item";

export type TransactionItem = {
  id?: string;
  item?: Item;
  brand?: Item;
  category?: Item;
  quantity?: number;
  unitOfMeasurement?: string;
  totalValue?: number;
};
