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
  updateItems: (items: Item[]) => void;
}

export const Modal = ({ itens, api, updateItems }: ModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  const openModal = (): void => {
    setModalIsOpen(true);
  };

  const deleteItem = async (itemToDelete: Item): Promise<void> => {
    const updatedItems = itens.filter(({ id }) => id !== itemToDelete.id);
    updateItems(updatedItems);
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
                <ModalListItem
                  key={item.id}
                  item={item}
                  api={api}
                  deleteItem={deleteItem}
                />
              );
            })}
          </ul>
        </ReactModal>
      )}
    </>
  );
};
