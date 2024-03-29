import { useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/api/IItemApi";

interface ModalListItemProps {
  item: Item;
  api: IItemApi;
  deleteItem: (itemToDelete: Item) => void;
  updateItem: (itemToUpdate: Item) => void;
  selectItem: (item: Item) => void;
  activeItem: Item | null;
  setActiveItem: (item: Item) => void;
}

export const ModalListItem = (props: ModalListItemProps) => {
  const [item, setItem] = useState<Item>(props.item);
  const [edit, setEdit] = useState<boolean>(false);

  const changeItem = (event: any): any => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const deleteItem = async (): Promise<void> => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Delete item?")) return;
    const nullOnError = await props.api.delete(item);
    if (nullOnError === null) {
      alert("Erro ao deletar o item!");
      return;
    }
    props.deleteItem(item);
  };

  const updateItem = async (): Promise<void> => {
    const updatedItem = await props.api.update(item);
    if (updatedItem === null) {
      alert("Erro ao salvar o item!");
      return;
    }
    props.updateItem(updatedItem);
    setEdit(false);
  };

  const selectItem = (): void => {
    props.setActiveItem(props.item);
  };

  return (
    <li
      key={props.item.id}
      className={
        props.activeItem?.id === props.item.id ? "modal-li-active" : ""
      }
      onClick={selectItem}
    >
      <div className="modal-li-input">
        <input
          type="text"
          value={item.description}
          name={"description"}
          onChange={changeItem}
          disabled={!edit}
          autoComplete={"off"}
        />
      </div>
      {(edit && (
        <div>
          <button type="button" onClick={() => setEdit(false)}>
            Cancelar
          </button>
          <button type="button" onClick={updateItem}>
            Salvar
          </button>
        </div>
      )) || (
        <div>
          <button type="button" onClick={() => setEdit(true)}>
            Editar
          </button>
        </div>
      )}
      <div>
        <button type="button" className="btn-delete" onClick={deleteItem}>
          x
        </button>
      </div>
    </li>
  );
};
