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

  const getSelectedItem = (item: Item, field: string): void => {
    setTransactionItem({ ...transactionItem, [field.toLowerCase()]: item });
  };

  const changeField = (event: any): void => {
    setTransactionItem({
      ...transactionItem,
      [event.target.name]: event.target.value,
    });
  };

  const addTransactionItem = async (): Promise<void> => {
    console.log(transactionItem);
    await api.create(transactionItem);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <form action="" onSubmit={FormUtils.blockSubmit}>
        <fieldset>
          <legend>Add Transaction Item Area</legend>

          <label>
            Item
            <SelectItemArea
              api={new ItemApi()}
              itemName="Item"
              returnSelectedItem={(item) => {
                getSelectedItem(item, "item");
              }}
            />
          </label>

          <label>
            Brand
            <SelectItemArea
              api={new ItemApi()}
              itemName="Brand"
              returnSelectedItem={(item) => {
                getSelectedItem(item, "brand");
              }}
            />
          </label>

          <label>
            Category
            <SelectItemArea
              api={new ItemApi()}
              itemName="Category"
              returnSelectedItem={(item) => {
                getSelectedItem(item, "category");
              }}
            />
          </label>

          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              value={transactionItem.quantity}
              onChange={changeField}
            />
          </label>

          <label>
            Unit of Measurement
            <input
              type="text"
              name="unitOfMeasurement"
              value={transactionItem.unitOfMeasurement}
              onChange={changeField}
            />
          </label>

          <label>
            Total Value
            <input
              type="number"
              name="totalValue"
              value={transactionItem.totalValue}
              onChange={changeField}
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
