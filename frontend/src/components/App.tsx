import { SearchTransactionArea } from "./SearchTransactionArea";
import { AddTransactionItemArea } from "./AddTransactionItemArea";
import { TransactionItemsList } from "./TransactionItemsList";
import { ITransactionApi } from "../services/ITransactionApi";
import { TransactionApi } from "../services/TransactionApi";
import { useState } from "react";
import { TransactionItem } from "../domain/TransactionItem";

export const App = () => {
  const api: ITransactionApi = new TransactionApi();//change to transaction items api
  const [transactionItems, setTransactionItems] = useState<TransactionItem[]>([]);

  return (
    <div>
      <SearchTransactionArea updateTransactionItems={setTransactionItems} />
      <p></p>
      <AddTransactionItemArea api={api} />
      <p></p>
      <TransactionItemsList
        api={api}
        items={transactionItems}
        updateTransactionItems={setTransactionItems}
      />
      <p></p>
    </div>
  );
};
