import { useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";

interface ModalListItemProps {
  item: Item;
  // itemName: string;
  api: IItemApi;
  // returnSelectedValue: (item: Item) => void;
  deleteItem: (itemToDelete: Item) => void;
}

export const ModalListItem = (props: ModalListItemProps) => {
  const [description, setDescription] = useState<string>(
    props.item.description
  );

  const changeDescription = (event: any): any => {
    setDescription(event.target.value);
  };

  const deleteItem = async (): Promise<void> => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete item?")) {
      await props.api.delete(props.item.id);
      props.deleteItem(props.item);
    }
  };

  return (
    <li key={props.item.id}>
      <input type="text" value={description} onChange={changeDescription} />
      <button type="button" onClick={deleteItem}>
        x
      </button>
    </li>
  );
};
