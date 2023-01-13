import { useState } from "react";
import ReactModal from "react-modal";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";
import { ModalListItem } from "./ModalListItem";

ReactModal.setAppElement("#root");

interface ModalProps {
  items: Item[];
  // itemName: string;
  api: IItemApi;
  // returnSelectedValue: (item: Item) => void;
  updateItems: (items: Item[]) => void;
}

export const Modal = ({ items, api, updateItems }: ModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  const openModal = (): void => {
    setModalIsOpen(true);
  };

  const deleteItem = async (itemToDelete: Item): Promise<void> => {
    const updatedItems = items.filter(({ id }) => id !== itemToDelete.id);
    updateItems(updatedItems);
  };

  const updateItem = async (itemToUpdate: Item): Promise<void> => {
    const newItems = Object.assign<Item[], Item[]>([], items);
    const itemIndex = newItems.findIndex(({ id }) => id === itemToUpdate.id);
    newItems[itemIndex] = itemToUpdate;
    updateItems(newItems);
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
            {items.map((item) => {
              return (
                <ModalListItem
                  key={item.id}
                  item={item}
                  api={api}
                  deleteItem={deleteItem}
                  updateItem={updateItem}
                />
              );
            })}
          </ul>
        </ReactModal>
      )}
    </>
  );
};
