import React, { useEffect, useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";
import "./SelectItemArea.css";

export type SelectItemAreaProps = {
  itemName: string;
  api: IItemApi;
};

export const SelectItemArea: React.FC<SelectItemAreaProps> = (props) => {
  const [defaultItems, setDefaultItems] = useState<Item[]>([]);
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [currentText, setCurrentText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const items = await props.api.getAll();
      setDefaultItems(items);
    })();
  }, []);

  const handleAddItem = () => {
    alert(`show modal with ${props.itemName}s`);
  };

  const selectItem = (itemName: string): void => {
    setCurrentText(itemName);
  };

  const captureCurrentText = (event: any): void => {
    setCurrentText(event.target.value);
  };

  useEffect(() => {
    const filteredItems = filterItemsWithText(defaultItems, currentText);
    setCurrentItems(filteredItems);
  }, [currentText]);

  const filterItemsWithText = (items: Item[], text: string): Item[] => {
    text = text.toLowerCase();
    return items.filter((item) => item.description.toLowerCase().includes(text));
  };

  const currentTextFocusOut = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <p>Select Item Area - {props.itemName}</p>

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
              <li key={item.id} onClick={() => selectItem(item.description)}>
                {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr />
      <button onClick={handleAddItem}>+</button>
    </div>
  );
};
