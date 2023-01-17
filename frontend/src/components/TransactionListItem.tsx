import { useState } from "react";
import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { TransactionItemArea } from "./TransactionItemArea";

interface TransactionListItemProps {
  transactionItem: TransactionItem;
  api: ITransactionItemApi;
  updateTransactionItem: (transactionItem: TransactionItem) => void;
}

export const TransactionListItem = (props: TransactionListItemProps) => {
  const [transactionItem, setTransactionItem] = useState<TransactionItem>(
    props.transactionItem
  );
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const editItem = async (): Promise<void> => {
    await props.api.update(transactionItem.id!, transactionItem);
    props.updateTransactionItem(transactionItem);
    setCanEdit(false);
  };

  return (
    <>
      <TransactionItemArea
        updateTransactionItem={setTransactionItem}
        savedTransactionItem={props.transactionItem}
        canEditFields={canEdit}
      />
      {canEdit ? (
        <>
          <button type="button" onClick={() => setCanEdit(false)}>
            Cancel
          </button>
          <button type="button" onClick={editItem}>
            Save
          </button>
        </>
      ) : (
        <button type="button" onClick={() => setCanEdit(true)}>
          Edit
        </button>
      )}
      <button type="button">X</button>
    </>
  );
};
