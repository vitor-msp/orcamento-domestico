import { SearchTransactionArea } from "./SearchTransactionArea";
import { AddTransactionItemArea } from "./AddTransactionItemArea";
import { TransactionItemsList } from "./TransactionItemsList";

export const App = () => {

  return (
    <div>
      <SearchTransactionArea />
      <p></p>
      <AddTransactionItemArea />
      <p></p>
      <TransactionItemsList />
      <p></p>
    </div>
  );
};
