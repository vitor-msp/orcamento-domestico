import { SelectItemArea } from "./SelectItemArea";

export const SearchTransactionArea = () => {
  return (
    <div>
      <form action="">
        <fieldset>
          <legend>Search Transaction Area</legend>

          <label htmlFor="">
            enterprise
            <SelectItemArea itemName="enterprise" />
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
