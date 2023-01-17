import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionApi } from "../services/ITransactionApi";

interface TransactionItemsListProps {
  api: ITransactionApi;
  items: TransactionItem[];
  updateTransactionItems: (transactionItems: TransactionItem[]) => void;
}

export const TransactionItemsList = ({
  api,
  items,
  updateTransactionItems,
}: TransactionItemsListProps) => {
  return (
    <div style={{ border: "1px solid red" }}>
      <p>Transaction Items List</p>
      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.brand?.description}</li>;
        })}
      </ul>
    </div>
  );
};
