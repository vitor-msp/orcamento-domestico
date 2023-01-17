import { SearchTransactionArea } from "./SearchTransactionArea";
import { AddTransactionItemArea } from "./AddTransactionItemArea";
import { TransactionItemsList } from "./TransactionItemsList";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { TransactionItemApi } from "../services/TransactionItemApi";
import { useState } from "react";
import { TransactionItem } from "../domain/TransactionItem";

export const App = () => {
  const api: ITransactionItemApi = new TransactionItemApi();
  const [transactionItems, setTransactionItems] = useState<TransactionItem[]>(
    []
  );

  return (
    <div>
      <SearchTransactionArea updateTransactionItems={setTransactionItems} />
      {/* <p></p>
      <AddTransactionItemArea
        api={api}
        items={transactionItems}
        updateTransactionItems={setTransactionItems}
      />
      <p></p>
      <TransactionItemsList
        api={api}
        items={transactionItems}
        updateTransactionItems={setTransactionItems}
      />
      <p></p> */}
    </div>
  );
};
