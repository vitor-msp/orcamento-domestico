import { useState } from "react";
import ReactModal from "react-modal";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";
import { ModalListItem } from "./ModalListItem";

ReactModal.setAppElement("#root");

interface ModalProps {
  items: Item[];
  api: IItemApi;
  updateItems: (items: Item[]) => void;
  selectItem: (item: Item) => void;
}

export const Modal = (props: ModalProps) => {
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
    const updatedItems = props.items.filter(({ id }) => id !== itemToDelete.id);
    props.updateItems(updatedItems);
  };

  const updateItem = async (itemToUpdate: Item): Promise<void> => {
    const newItems = Object.assign<Item[], Item[]>([], props.items);
    const itemIndex = newItems.findIndex(({ id }) => id === itemToUpdate.id);
    newItems[itemIndex] = itemToUpdate;
    props.updateItems(newItems);
  };

  const createItem = async (): Promise<void> => {
    const id = await props.api.create(newItem);
    newItem.id = id;
    props.items.push(newItem);
    setNewItem(emptyItem);
    props.updateItems(props.items);
  };

  const selectItem = (item: Item): void => {
    props.selectItem(item);
    closeModal();
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
            {props.items.map((item) => {
              return (
                <ModalListItem
                  key={item.id}
                  item={item}
                  api={props.api}
                  deleteItem={deleteItem}
                  updateItem={updateItem}
                  selectItem={selectItem}
                />
              );
            })}
          </ul>
        </ReactModal>
      )}
    </>
  );
};