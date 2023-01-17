import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { TransactionListItem } from "./TransactionListItem";

interface TransactionItemsListProps {
  api: ITransactionItemApi;
  items: TransactionItem[];
  updateTransactionItems: (transactionItems: TransactionItem[]) => void;
}

export const TransactionItemsList = (props: TransactionItemsListProps) => {
  const updateTransactionItem = (updatedItem: TransactionItem): void => {
    const itemIndex = props.items.findIndex(
      (item) => item.id === updatedItem.id
    );
    props.items[itemIndex] = updatedItem;
    props.updateTransactionItems(props.items);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <p>Transaction Items List</p>
      <ul>
        {props.items.map((item) => {
          return (
            <li key={item.id}>
              <TransactionListItem
                transactionItem={item}
                api={props.api}
                updateTransactionItem={updateTransactionItem}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
