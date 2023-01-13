import { useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";

interface ModalListItemProps {
  item: Item;
  // itemName: string;
  api: IItemApi;
  // returnSelectedValue: (item: Item) => void;
}

export const ModalListItem = ({ item, api }: ModalListItemProps) => {
  const [description, setDescription] = useState<string>(item.description);

  const changeDescription = (event: any): any => {
    setDescription(event.target.value);
  };

  return (
    <li key={item.id}>
      <input type="text" value={description} onChange={changeDescription} />
    </li>
  );
};
