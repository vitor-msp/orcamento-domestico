import { useState } from "react";
import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { FormUtils } from "../utils/FormUtils";
import { TransactionItemArea } from "./TransactionItemArea";

interface AddTransactionItemAreaProps {
  api: ITransactionItemApi;
}

export const AddTransactionItemArea = ({
  api,
}: AddTransactionItemAreaProps) => {
  const emptyTransactionItem: TransactionItem = {};

  const [transactionItem, setTransactionItem] =
    useState<TransactionItem>(emptyTransactionItem);

  const updateTransactionItem = async (
    transactionItem: TransactionItem
  ): Promise<void> => {
    setTransactionItem(transactionItem);
  };

  const addTransactionItem = async (): Promise<void> => {
    console.log(transactionItem);
    await api.create(transactionItem);
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
