import { useState } from "react";
import Modal from "react-modal";
import { Item } from "../domain/Item";

Modal.setAppElement("#root");

interface ModalItemProps {
  itens: Item[];
}

export const ModalItem = (props: ModalItemProps) => {
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
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div>I am a modal</div>
          <ul>
            {props.itens.map((item) => {
              return <li key={item.id}>{item.description}</li>;
            })}
          </ul>
        </Modal>
      )}
    </>
  );
};
