import { useState } from "react";
import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { FormUtils } from "../utils/FormUtils";
import { TransactionItemArea } from "./TransactionItemArea";

interface AddTransactionItemAreaProps {
  api: ITransactionItemApi;
  items: TransactionItem[];
  updateTransactionItems: (transactionItems: TransactionItem[]) => void;
}

export const AddTransactionItemArea = (props: AddTransactionItemAreaProps) => {
  const emptyTransactionItem: TransactionItem = {};

  const [transactionItem, setTransactionItem] =
    useState<TransactionItem>(emptyTransactionItem);

  const updateTransactionItem = async (
    transactionItem: TransactionItem
  ): Promise<void> => {
    setTransactionItem(transactionItem);
  };

  const addTransactionItem = async (): Promise<void> => {
    await props.api.create(transactionItem);
    const newItems = Object.assign([], props.items);
    newItems.push(transactionItem);
    props.updateTransactionItems(newItems);
  };

  return (
    <div>
      <form action="" onSubmit={FormUtils.blockSubmit}>
        <TransactionItemArea updateTransactionItem={updateTransactionItem} />
        <button type="button" onClick={addTransactionItem}>
          Add
        </button>
      </form>
    </div>
  );
};
