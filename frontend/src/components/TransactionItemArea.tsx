import { useEffect, useState } from "react";
import { Item } from "../domain/Item";
import { TransactionItem } from "../domain/TransactionItem";
import { SelectItemArea } from "./SelectItemArea";
import { itemApi, brandApi, categoryApi } from "..";

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
    <div className="transaction-item">
      <div>
        <div>
          <label htmlFor="transaction-item-item">item</label>
          <SelectItemArea
            api={itemApi}
            itemName="Item"
            returnSelectedItem={(item) => {
              getSelectedItem(item, "item");
            }}
            canEdit={canEdit}
            defaultItem={transactionItem.item}
          />
        </div>
        <div>
          <label htmlFor="transaction-item-brand">marca</label>
          <SelectItemArea
            api={brandApi}
            itemName="Brand"
            returnSelectedItem={(item) => {
              getSelectedItem(item, "brand");
            }}
            canEdit={canEdit}
            defaultItem={transactionItem.brand}
          />
        </div>
        <div>
          <label htmlFor="transaction-item-category">categoria</label>
          <SelectItemArea
            api={categoryApi}
            itemName="Category"
            returnSelectedItem={(item) => {
              getSelectedItem(item, "category");
            }}
            canEdit={canEdit}
            defaultItem={transactionItem.category}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="transaction-item-quantity">quantidade</label>
          <input
            type="number"
            name="quantity"
            value={transactionItem.quantity}
            onChange={changeField}
            disabled={!canEdit}
            id="transaction-item-quantity"
          />
        </div>
        <div>
          <label htmlFor="transaction-item-um">unidade de medida</label>
          <input
            type="text"
            name="unitOfMeasurement"
            value={transactionItem.unitOfMeasurement}
            onChange={changeField}
            disabled={!canEdit}
            id="transaction-item-um"
          />
        </div>
        <div>
          <label htmlFor="transaction-item-total-value">valor total (R$)</label>
          <input
            type="number"
            step={0.05}
            name="totalValue"
            value={transactionItem.totalValue}
            onChange={changeField}
            disabled={!canEdit}
            id="transaction-item-total-value"
          />
        </div>
      </div>
    </div>
  );
};
