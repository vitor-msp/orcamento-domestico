import React, { useEffect, useState } from "react";
import "./SelectItemArea.css";

export type SelectItemAreaProps = {
  itemName: string;
};

export const SelectItemArea: React.FC<SelectItemAreaProps> = (props) => {
  const INITIAL_ITEMS = ["Citopharma", "Autentica", "Cemig", "Tim"];
  const [defaultItems, setDefaultItems] = useState<string[]>(INITIAL_ITEMS);
  const [currentItems, setCurrentItems] = useState<string[]>(INITIAL_ITEMS);
  const [currentText, setCurrentText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleAddItem = () => {
    alert(`show modal with ${props.itemName}s`);
  };

  const selectItem = (itemName: string): void => {
    alert(`${itemName} have been selected`);
  };

  const captureCurrentText = (event: any): void => {
    setCurrentText(event.target.value);
  };

  useEffect(() => {
    const filteredItems = filterItemsWithText(defaultItems, currentText);
    setCurrentItems(filteredItems);
  }, [currentText]);

  const filterItemsWithText = (items: string[], text: string): string[] => {
    text = text.toLowerCase();
    return items.filter((item) => item.toLowerCase().includes(text));
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
            onKeyUp={captureCurrentText}
            onFocus={() => setShowDropdown(true)}
            onBlur={currentTextFocusOut}
          />
          <ul style={showDropdown ? { display: "block" } : { display: "none" }}>
            {currentItems.map((item) => (
              <li key={item} onClick={() => selectItem(item)}>
                {item}
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
