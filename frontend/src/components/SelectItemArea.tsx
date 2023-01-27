import React, { useEffect, useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/api/IItemApi";
import { Modal } from "./Modal";
import "../design/styles.css";
import { repository } from "..";

export type SelectItemAreaProps = {
  itemName: string;
  api: IItemApi;
  returnSelectedItem: (item: Item) => void;
  canEdit: boolean;
  defaultItem?: Item;
};

export const SelectItemArea = (props: SelectItemAreaProps) => {
  const [defaultItems, setDefaultItems] = useState<Item[]>([]);
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentText, setCurrentText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (defaultItems.length !== 0) return;
      const items = await repository.getAsync(props.itemName.toLowerCase());
      setDefaultItems(items);
      setCurrentItems(items);
    })();
  }, []);

  useEffect(() => {
    if (props.defaultItem) selectItem(props.defaultItem);
  }, [props.defaultItem]);

  useEffect(() => {
    setCanEdit(props.canEdit);
  }, [props.canEdit]);

  const selectItem = (item: Item): void => {
    setCurrentText(item.description);
    setCurrentItem(item);
  };

  const captureCurrentText = (event: any): void => {
    setCurrentText(event.target.value);
  };

  useEffect(() => {
    const filteredItems = filterItemsWithText(defaultItems, currentText);
    setCurrentItems(filteredItems);
  }, [currentText]);

  useEffect(() => {
    if (currentItem) props.returnSelectedItem(currentItem);
  }, [currentItem]);

  const filterItemsWithText = (items: Item[], text: string): Item[] => {
    text = text.toLowerCase();
    return items.filter((item) =>
      item.description.toLowerCase().includes(text)
    );
  };

  const currentTextFocusOut = (): void => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <div className="dropdown">
      <div>
        {/* <label htmlFor="select-item-area-input">{props.itemName}</label> */}
        <input
          type="text"
          placeholder={`Digite o(a) ${props.itemName}...`}
          className="dropdown-input"
          onChange={captureCurrentText}
          onFocus={() => setShowDropdown(true)}
          onBlur={currentTextFocusOut}
          value={currentText}
          disabled={!canEdit}
          id="select-item-area-input"
          autoComplete={"off"}
        />
        <Modal
          items={defaultItems}
          api={props.api}
          updateItems={setDefaultItems}
          selectItem={selectItem}
        />
      </div>
      <div
        className="dropdown-content"
        style={showDropdown ? { display: "block" } : { display: "none" }}
      >
        <ul>
          {currentItems.map((item) => (
            <li key={item.id} onClick={() => selectItem(item)}>
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
