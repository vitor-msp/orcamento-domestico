import { Transaction } from "../domain/Transaction";
import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/api/ITransactionItemApi";
import { TransactionItemsTotalValue } from "./TransactionItemsTotalValue";
import { TransactionListItem } from "./TransactionListItem";

interface TransactionItemsListProps {
  api: ITransactionItemApi;
  transaction: Transaction;
  updateTransaction: (transaction: Transaction) => void;
}

export const TransactionItemsList = (props: TransactionItemsListProps) => {
  const updateTransactionItem = (updatedItem: TransactionItem): void => {
    const itemIndex = props.transaction.transactionItems!.findIndex(
      (item) => item.id === updatedItem.id
    );
    props.transaction.transactionItems![itemIndex] = updatedItem;
    props.updateTransaction(props.transaction);
  };

  const deleteTransactionItem = (deletedItem: TransactionItem): void => {
    const newItems = props.transaction.transactionItems!.filter(
      (item) => item.id !== deletedItem.id
    );
    props.updateTransaction({
      ...props.transaction,
      transactionItems: newItems,
    });
  };

  return (
    <div>
      <div className="transaction-items-list-header">
        <h4>Itens</h4>
        <TransactionItemsTotalValue
          items={props.transaction.transactionItems ?? []}
        />
      </div>
      <ul>
        {props.transaction.transactionItems?.map((item) => {
          item.transaction = props.transaction.id;
          return (
            <li>
              <TransactionListItem
                key={item.id}
                transactionItem={item}
                api={props.api}
                updateTransactionItem={updateTransactionItem}
                deleteTransactionItem={deleteTransactionItem}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
