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
      <h2>Orçamento Doméstico</h2>
      <div className="search-transaction-area">
        <SearchTransactionArea updateTransactionItems={setTransactionItems} />
      </div>
      <div className="add-transaction-item-area">
        <AddTransactionItemArea
          api={api}
          items={transactionItems}
          updateTransactionItems={setTransactionItems}
        />
      </div>
      <div className="transaction-items-list">
        <TransactionItemsList
          api={api}
          items={transactionItems}
          updateTransactionItems={setTransactionItems}
        />
      </div>
    </div>
  );
};
