import { SearchTransactionArea } from "./SearchTransactionArea";
import { AddTransactionItemArea } from "./AddTransactionItemArea";
import { TransactionItemsList } from "./TransactionItemsList";
import { ModalItem } from "./ModalItem";
import { useState } from "react";

export const App = () => {
  // const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <SearchTransactionArea />
      <p></p>
      <AddTransactionItemArea />
      <p></p>
      <TransactionItemsList />
      <p></p>
      {/* {modalIsOpen && (
        <ModalItem
          isOpen={modalIsOpen}
          onAfterOpen={() => setModalIsOpen(true)}
          onRequestClose={() => setModalIsOpen(false)}
        />
      )} */}
    </div>
  );
};
