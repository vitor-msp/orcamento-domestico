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
  const [clearInputs, setClearInputs] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(1);

  const addTransactionItem = async (): Promise<void> => {
    if (!FieldsValidator.fieldsAreValid(Array.of(transactionItem))) return;
    for (let index = 0; index < counter; index++) {
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
    }
    setClearInputs(true);
    setCounter(1);
  };

  const updateTransactionItem = (transactionItem: TransactionItem): void => {
    setTransactionItem({
      ...transactionItem,
      transaction: props.transaction.id,
    });
  };

  const changeCounter = (event: any) => {
    setCounter(event.target.value);
  };

  return (
    <div>
      <form action="" onSubmit={FormUtils.blockSubmit}>
        <h4>Adicionar item</h4>
        <TransactionItemArea
          updateTransactionItem={updateTransactionItem}
          savedTransactionItem={null}
          canEditFields={true}
          enterPressed={addTransactionItem}
          clearInputs={clearInputs}
          setClearInputs={setClearInputs}
        />
        <div className="add-transaction-item-area-btn">
          <input type="number" value={counter} onChange={changeCounter} />
          <button type="button" onClick={addTransactionItem}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
