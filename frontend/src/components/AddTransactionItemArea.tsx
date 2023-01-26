import { useEffect, useState } from "react";
import { Transaction } from "../domain/Transaction";
import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionItemApi } from "../services/api/ITransactionItemApi";
import { FieldsValidator } from "../utils/FieldsValidator";
import { FormUtils } from "../utils/FormUtils";
import { TransactionItemArea } from "./TransactionItemArea";

interface AddTransactionItemAreaProps {
  api: ITransactionItemApi;
  transaction: Transaction;
  updateTransaction: (transaction: Transaction) => void;
}

export const AddTransactionItemArea = (props: AddTransactionItemAreaProps) => {
  const emptyTransactionItem: TransactionItem = {
    id: "",
    transaction: props.transaction.id,
    item: undefined,
    brand: undefined,
    category: undefined,
    quantity: 0,
    unitOfMeasurement: "",
    totalValue: 0,
  };
  const [transactionItem, setTransactionItem] =
    useState<TransactionItem>(emptyTransactionItem);

  const addTransactionItem = async (): Promise<void> => {
    if (!FieldsValidator.fieldsAreValid(Array.of(transactionItem))) return;
    const savedItem = await props.api.create(transactionItem);
    if (savedItem === null) {
      alert("Erro ao criar item!");
      return;
    }
    const newTransactionItems: TransactionItem[] =
      props.transaction.transactionItems ?? [];
    newTransactionItems.push(savedItem);
    props.updateTransaction({
      ...props.transaction,
      transactionItems: newTransactionItems,
    });
  };

  const updateTransactionItem = (transactionItem: TransactionItem): void => {
    setTransactionItem({
      ...transactionItem,
      transaction: props.transaction.id,
    });
  };

  return (
    <div>
      <form action="" onSubmit={FormUtils.blockSubmit}>
        <h4>Adicionar item</h4>
        <TransactionItemArea
          updateTransactionItem={updateTransactionItem}
          savedTransactionItem={null}
          canEditFields={true}
        />
        <div className="add-transaction-item-area-btn">
          <button type="button" onClick={addTransactionItem}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
