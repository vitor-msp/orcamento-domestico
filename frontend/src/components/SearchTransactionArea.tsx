import { Item } from "../domain/Item";
import { EnterpriseApi } from "../services/EnterpriseApi";
import { SelectItemArea } from "./SelectItemArea";

export const SearchTransactionArea = () => {
  const getSelectedValue = (item: Item): void => {
    alert(`SearchTransactionArea ${item.description}`);
  };

  return (
    <div>
      <form action="">
        <fieldset>
          <legend>Search Transaction Area</legend>

          <label htmlFor="">
            enterprise
            <SelectItemArea
              itemName="enterprise"
              api={new EnterpriseApi()}
              returnSelectedValue={getSelectedValue}
            />
          </label>

          <label htmlFor="">
            date
            <input type="date" name="" id="" />
          </label>
        </fieldset>
      </form>
    </div>
  );
};
