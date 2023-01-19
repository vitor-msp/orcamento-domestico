import { useState } from "react";
import { Item } from "../domain/Item";
import { IItemApi } from "../services/IItemApi";

interface ModalListItemProps {
  item: Item;
  api: IItemApi;
  deleteItem: (itemToDelete: Item) => void;
  updateItem: (itemToUpdate: Item) => void;
  selectItem: (item: Item) => void;
}

export const ModalListItem = (props: ModalListItemProps) => {
  const [item, setItem] = useState<Item>(props.item);
  const [edit, setEdit] = useState<boolean>(false);

  const changeItem = (event: any): any => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const deleteItem = async (): Promise<void> => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete item?")) {
      await props.api.delete(item.id);
      props.deleteItem(item);
    }
  };

  const updateItem = async (): Promise<void> => {
    await props.api.update(item.id, item);
    props.updateItem(item);
    setEdit(false);
  };

  return (
    <li key={props.item.id}>
      <input
        type="text"
        value={item.description}
        name={"description"}
        onChange={changeItem}
        disabled={!edit}
      />
      {(edit && (
        <>
          <button type="button" onClick={() => setEdit(false)}>
            Cancelar
          </button>
          <button type="button" onClick={updateItem}>
            Salvar
          </button>
        </>
      )) || (
        <button type="button" onClick={() => setEdit(true)}>
          Editar
        </button>
      )}
      <button type="button" className="btn-delete" onClick={deleteItem}>
        x
      </button>
      {/* <button type="button" onClick={() => props.selectItem(props.item)}>
        Selecionar
      </button> */}
    </li>
  );
};
