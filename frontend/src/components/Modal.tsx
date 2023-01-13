import { useState } from "react";
import ReactModal from "react-modal";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";
import { ModalListItem } from "./ModalListItem";

ReactModal.setAppElement("#root");

interface ModalProps {
  itens: Item[];
  // itemName: string;
  api: IItemApi;
  // returnSelectedValue: (item: Item) => void;
}

export const Modal = ({itens,api}: ModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  const openModal = (): void => {
    setModalIsOpen(true);
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        show modal
      </button>
      {modalIsOpen && (
        <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div>I am a modal</div>
          <ul>
            {itens.map((item) => {
              return (
                <ModalListItem key={item.id} item={item} api={api} />
              );
            })}
          </ul>
        </ReactModal>
      )}
    </>
  );
};
