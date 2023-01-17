import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { TransactionItemArea } from "./TransactionItemArea";

interface TransactionItemsListProps {
  api: ITransactionItemApi;
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
          return (
            <li key={item.id}>
              <TransactionItemArea
                updateTransactionItem={() => {}}
                savedTransactionItem={item}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
