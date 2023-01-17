import { useEffect, useState } from "react";
import { Item } from "../domain/Item";
import { TransactionItem } from "../domain/TransactionItem";
import { ItemApi } from "../services/ItemApi";
import { SelectItemArea } from "./SelectItemArea";

interface TransactionItemAreaProps {
  updateTransactionItem: (transactionItem: TransactionItem) => void;
  savedTransactionItem?: TransactionItem | null | undefined;
  canEditFields: boolean;
}

export const TransactionItemArea = (props: TransactionItemAreaProps) => {
  const emptyTransactionItem: TransactionItem = {};
  const [transactionItem, setTransactionItem] = useState<TransactionItem>(
    props.savedTransactionItem ?? emptyTransactionItem
  );
  const [canEdit, setCanEdit] = useState<boolean>(true);

  useEffect(() => {
    setCanEdit(props.canEditFields);
  }, [props.canEditFields]);

  const getSelectedItem = (item: Item, field: string): void => {
    setTransactionItem({ ...transactionItem, [field.toLowerCase()]: item });
  };

  const changeField = (event: any): void => {
    setTransactionItem({
      ...transactionItem,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    props.updateTransactionItem(transactionItem);
  }, [transactionItem]);

  return (
    <div>
      <fieldset>
        <legend>Transaction Item Area</legend>

        <label>
          Item
          <SelectItemArea
            api={new ItemApi()}
            itemName="Item"
            returnSelectedItem={(item) => {
              getSelectedItem(item, "item");
            }}
            canEdit={canEdit}
            defaultItem={transactionItem.item}
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
            canEdit={canEdit}
            defaultItem={transactionItem.brand}
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
            canEdit={canEdit}
            defaultItem={transactionItem.category}
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            value={transactionItem.quantity}
            onChange={changeField}
            disabled={!canEdit}
          />
        </label>

        <label>
          Unit of Measurement
          <input
            type="text"
            name="unitOfMeasurement"
            value={transactionItem.unitOfMeasurement}
            onChange={changeField}
            disabled={!canEdit}
          />
        </label>

        <label>
          Total Value
          <input
            type="number"
            name="totalValue"
            value={transactionItem.totalValue}
            onChange={changeField}
            disabled={!canEdit}
          />
        </label>
      </fieldset>
    </div>
  );
};
