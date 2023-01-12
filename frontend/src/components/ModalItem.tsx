import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const ModalItem = () => {
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
        </Modal>
      )}
    </>
  );
};
