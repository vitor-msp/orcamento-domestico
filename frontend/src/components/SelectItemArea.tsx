import React from "react";

export type SelectItemAreaProps = {
  itemName: string;
};

export const SelectItemArea: React.FC<SelectItemAreaProps> = (props) => {
  return (
    <div style={{ border: "1px solid red" }}>
      <p>Select Item Area - {props.itemName}</p>
      <input type="text" />
    </div>
  );
};
