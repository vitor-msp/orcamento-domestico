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
  const emptyItem: Item = { id: "", description: "" };
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Item>(emptyItem);

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  const openModal = (): void => {
    setModalIsOpen(true);
  };

  const changeNewItem = (event: any): void => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
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

  const createItem = async (): Promise<void> => {
    const id = await api.create(newItem);
    newItem.id = id;
    items.push(newItem);
    setNewItem(emptyItem);
    updateItems(items);
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        show modal
      </button>
      {modalIsOpen && (
        <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <p>Itens</p>
          <input
            type="text"
            value={newItem.description}
            name={"description"}
            onChange={changeNewItem}
          />
          <button type="button" onClick={createItem}>
            {"+"}
          </button>
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
