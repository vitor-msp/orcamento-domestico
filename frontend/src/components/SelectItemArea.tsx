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

  const handleAddItem = () => {
    alert(`show modal with ${props.itemName}s`);
  };

  function filterFunction() {
    var txtValue, input, div, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input!.ariaValueText!.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div!.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

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

  return (
    <div style={{ border: "1px solid red" }}>
      <p>Select Item Area - {props.itemName}</p>

      <div className="dropdown" style={{ border: "1px solid yellow" }}>
        <div id="myDropdown" className="dropdown-content">
          <input
            type="text"
            placeholder="Search.."
            id="myInput"
            onKeyUp={captureCurrentText}
          />
          <ul>
            {currentItems.map((item) => (
              <li
                key={item}
                onClick={() => {
                  selectItem(item);
                }}
              >
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
