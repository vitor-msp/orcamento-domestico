import { useState } from "react";
import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { TransactionItemArea } from "./TransactionItemArea";

interface TransactionListItemProps {
  transactionItem: TransactionItem;
  api: ITransactionItemApi;
  updateTransactionItem: (transactionItem: TransactionItem) => void;
  deleteTransactionItem: (transactionItem: TransactionItem) => void;
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

  const deleteItem = async (): Promise<void> => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete item?")) {
      await props.api.delete(transactionItem.id!);
      props.deleteTransactionItem(transactionItem);
    }
  };

  return (
    <div>
      <TransactionItemArea
        updateTransactionItem={setTransactionItem}
        savedTransactionItem={props.transactionItem}
        canEditFields={canEdit}
      />
      <div className="transaction-list-item-btn">
        {canEdit ? (
          <div>
            <button type="button" onClick={() => setCanEdit(false)}>
              Cancel
            </button>
            <button type="button" onClick={editItem}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => setCanEdit(true)}>
              Edit
            </button>
          </div>
        )}
        <div>
          <button type="button" className="btn-delete" onClick={deleteItem}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};
