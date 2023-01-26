import { useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/api/IItemApi";
import { ModalListItem } from "./ModalListItem";
import "../design/styles.css";

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
  const [activeItem, setActiveItem] = useState<Item | null>(null);

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
    const savedItem = await props.api.create(newItem);
    if (savedItem === null) {
      alert("Erro ao criar o item!");
      return;
    }
    props.items.push(savedItem);
    props.updateItems(props.items);
    setNewItem(emptyItem);
  };

  const selectItem = (item: Item): void => {
    props.selectItem(item);
    closeModal();
  };

  const selectActiveItem = (): void => {
    if (activeItem) selectItem(activeItem);
  };

  return (
    <>
      <div className="modal-btn">
        <button type="button" onClick={openModal}>
          +
        </button>
      </div>
      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h4>Itens</h4>
              </div>
              <div>
                <button type="button" onClick={closeModal}>
                  X
                </button>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={newItem.description}
                name={"description"}
                onChange={changeNewItem}
              />
              <button type="button" onClick={createItem}>
                {"+"}
              </button>
            </div>
            <div className="modal-list">
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
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                    />
                  );
                })}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                disabled={!activeItem}
                onClick={selectActiveItem}
              >
                Selecionar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
