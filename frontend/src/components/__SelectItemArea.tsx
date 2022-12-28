import React from "react";
import "./SelectItemArea.css";

export type SelectItemAreaProps = {
  itemName: string;
};

export const SelectItemArea: React.FC<SelectItemAreaProps> = (props) => {
  const handleAddItem = () => {
    alert(`show modal with ${props.itemName}s`);
  };

  function myFunction() {
    document.getElementById("myDropdown")!.classList.toggle("show");
  }

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

  return (
    <div style={{ border: "1px solid red" }}>
      <p>Select Item Area - {props.itemName}</p>
      <input type="text" value={"teste"}/>

      <div className="dropdown" style={{ border: "1px solid green" }}>
        <button onClick={myFunction} className="dropbtn">
          Dropdown
        </button>
        <div id="myDropdown" className="dropdown-content show">
          <input
            type="text"
            placeholder="Search.."
            id="myInput"
            onKeyUp={filterFunction}
          />
          <a href="#about">About</a>
          <a href="#base">Base</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
          <a href="#custom">Custom</a>
          <a href="#support">Support</a>
          <a href="#tools">Tools</a>
        </div>
      </div>

      <hr />
      <input type="text" />
      <button onClick={handleAddItem}>+</button>
    </div>
  );
};
