import { SearchTransactionArea } from "./SearchTransactionArea";
import { AddTransactionItemArea } from "./AddTransactionItemArea";
import { TransactionItemsList } from "./TransactionItemsList";
import { ITransactionItemApi } from "../services/ITransactionItemApi";
import { useState } from "react";
import { transactionItemApi } from "..";
import { Transaction } from "../domain/Transaction";

export const App = () => {
  const api: ITransactionItemApi = transactionItemApi;
  const [transaction, setTransaction] = useState<Transaction>({
    id: "",
    date: "",
    enterprise: "",
    transactionItems: [],
  });

  return (
    <div>
      <h2>Orçamento Doméstico</h2>
      <div className="search-transaction-area">
        <SearchTransactionArea updateTransaction={setTransaction} />
      </div>
      <div className="add-transaction-item-area">
        <AddTransactionItemArea
          api={api}
          transaction={transaction}
          updateTransaction={setTransaction}
        />
      </div>
      <div className="transaction-items-list">
        <TransactionItemsList
          api={api}
          transaction={transaction}
          updateTransaction={setTransaction}
        />
      </div>
    </div>
  );
};
