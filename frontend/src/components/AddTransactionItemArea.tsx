import { useState } from "react";
import { Item } from "../domain/Item";
import { TransactionItem } from "../domain/TransactionItem";
import { ItemApi } from "../services/ItemApi";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { FormUtils } from "../utils/FormUtils";
import { SelectItemArea } from "./SelectItemArea";

interface AddTransactionItemAreaProps {
  api: ITransactionItemApi;
}

export const AddTransactionItemArea = ({
  api,
}: AddTransactionItemAreaProps) => {
  const emptyTransactionItem: TransactionItem = {};

  const [transactionItem, setTransactionItem] =
    useState<TransactionItem>(emptyTransactionItem);

  const getSelectedItem = (item: Item): void => {
    setTransactionItem({ ...transactionItem, item });
  };

  const addTransactionItem = async (): Promise<void> => {
    console.log(transactionItem);
    await api.create(transactionItem);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <form action="" onSubmit={FormUtils.blockSubmit}>
        <fieldset>
          <legend>Add Transaction Area</legend>

          <label>
            <SelectItemArea
              api={new ItemApi()}
              itemName="Item"
              returnSelectedItem={getSelectedItem}
            />
          </label>

          <button type="button" onClick={addTransactionItem}>
            Add
          </button>
        </fieldset>
      </form>
    </div>
  );
};
