import React, { useEffect, useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";
import { Modal } from "./Modal";
import "./SelectItemArea.css";

export type SelectItemAreaProps = {
  itemName: string;
  api: IItemApi;
  returnSelectedItem: (item: Item) => void;
};

export const SelectItemArea = (props: SelectItemAreaProps) => {
  const [defaultItems, setDefaultItems] = useState<Item[]>([]);
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentText, setCurrentText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const items = await props.api.getAll();
      setDefaultItems(items);
    })();
  }, []);

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
    <div>
      <p>Select Item Area - {props.itemName}</p>

      <Modal
        items={defaultItems}
        api={props.api}
        updateItems={setDefaultItems}
        selectItem={selectItem}
      />

      <div className="dropdown">
        <div className="dropdown-content">
          <input
            type="text"
            placeholder="Search.."
            className="dropdown-input"
            onChange={captureCurrentText}
            onFocus={() => setShowDropdown(true)}
            onBlur={currentTextFocusOut}
            value={currentText}
          />
          <ul style={showDropdown ? { display: "block" } : { display: "none" }}>
            {currentItems.map((item) => (
              <li key={item.id} onClick={() => selectItem(item)}>
                {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p></p>
    </div>
  );
};
