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
        <legend>Adicionar item:</legend>
        <div>
          <div className="add-item-top">
            <div>
              <label htmlFor="add-item-item">item</label>
              <SelectItemArea
                api={new ItemApi()}
                itemName="Item"
                returnSelectedItem={(item) => {
                  getSelectedItem(item, "item");
                }}
                canEdit={canEdit}
                defaultItem={transactionItem.item}
              />
            </div>

            <div>
              <label htmlFor="add-item-brand">Brand</label>
              <SelectItemArea
                api={new ItemApi()}
                itemName="Brand"
                returnSelectedItem={(item) => {
                  getSelectedItem(item, "brand");
                }}
                canEdit={canEdit}
                defaultItem={transactionItem.brand}
              />
            </div>

            <div>
              <label htmlFor="add-item-category">Category</label>
              <SelectItemArea
                api={new ItemApi()}
                itemName="Category"
                returnSelectedItem={(item) => {
                  getSelectedItem(item, "category");
                }}
                canEdit={canEdit}
                defaultItem={transactionItem.category}
              />
            </div>
          </div>

          <div className="add-item-bottom">
            <div>
              <label htmlFor="add-item-quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={transactionItem.quantity}
                onChange={changeField}
                disabled={!canEdit}
                id="add-item-quantity"
              />
            </div>

            <div>
              <label htmlFor="add-item-um">Unit of Measurement</label>
              <input
                type="text"
                name="unitOfMeasurement"
                value={transactionItem.unitOfMeasurement}
                onChange={changeField}
                disabled={!canEdit}
                id="add-item-um"
              />
            </div>

            <div>
              <label htmlFor="add-item-total-value">Total Value</label>
              <input
                type="number"
                name="totalValue"
                value={transactionItem.totalValue}
                onChange={changeField}
                disabled={!canEdit}
                id="add-item-total-value"
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
