import { SearchArea } from "./SearchArea";
import { AddItemArea } from "./AddItemArea";
import { ItemsList } from "./ItemsList";

export const App = () => {
  return (
    <div style={{ border: "1px solid red", padding: "10px" }}>
      <p>App</p>
      <SearchArea />
      <p></p>
      <AddItemArea />
      <p></p>
      <ItemsList />
    </div>
  );
};
