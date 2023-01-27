import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (modalIsOpen) document.addEventListener("keyup", processKeyCloseModal);
  }, [modalIsOpen]);

  const processKeyCloseModal = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") return;
    setModalIsOpen(false);
    document.removeEventListener("keyup", processKeyCloseModal);
  };

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

  const createItem = async (itemFromEnter?: Item): Promise<void> => {
    let itemToCreate = Object.assign({}, newItem);
    if (itemFromEnter) itemToCreate = Object.assign({}, itemFromEnter);
    const savedItem = await props.api.create(itemToCreate);
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

  const setEventListener = (): void => {
    document.addEventListener("keyup", processKeyCreateItem);
  };

  const unsetEventListener = (): void => {
    document.removeEventListener("keyup", processKeyCreateItem);
  };

  const processKeyCreateItem = async (event: KeyboardEvent): Promise<void> => {
    if (event.key !== "Enter") return;
    //@ts-ignore
    await createItem({ id: "", description: event.target.value });
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
                onFocus={setEventListener}
                onBlur={unsetEventListener}
              />
              <button type="button" onClick={() => createItem()}>
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
