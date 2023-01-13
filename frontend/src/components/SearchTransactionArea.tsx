import { useState } from "react";
import { Item } from "../domain/Item";
import { Transaction } from "../domain/Transaction";
import { EnterpriseApi } from "../services/EnterpriseApi";
import { ITransactionApi } from "../services/ITransactionApi";
import { TransactionApi } from "../services/TransactionApi";
import { SelectItemArea } from "./SelectItemArea";

export const SearchTransactionArea = () => {
  const api: ITransactionApi = new TransactionApi();
  const [transaction, setTransaction] = useState<Transaction>({
    id: "",
    enterprise: "",
    date: "",
  });

  const getSelectedValue = (item: Item): void => {
    setTransaction({ ...transaction, enterprise: item.id });
  };

  const changeField = (event: any): void => {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  };

  const blockSubmit = (event: any): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const fieldIsValid = (field: any): boolean => {
    const inappropriateValues: any[] = [undefined, null, ""];
    return !inappropriateValues.includes(field);
  };

  const createTransaction = async (): Promise<void> => {
    const { enterprise, date } = transaction;
    if (fieldIsValid(enterprise) && fieldIsValid(date)) {
      await api.create(transaction);
    }
  };

  const updateTransaction = async (): Promise<void> => {
    const { id, enterprise, date } = transaction;
    if (fieldIsValid(id) && fieldIsValid(enterprise) && fieldIsValid(date)) {
      await api.update(id!, transaction);
    }
  };

  const deleteTransaction = async (): Promise<void> => {
    if (fieldIsValid(transaction.id)) {
      await api.delete(transaction.id!);
    }
  };

  const getTransaction = async (): Promise<void> => {
    const { enterprise, date } = transaction;
    if (fieldIsValid(enterprise) && fieldIsValid(date)) {
      const savedTransaction = await api.get(transaction);
      setTransaction({ ...savedTransaction });
    }
  };

  return (
    <div>
      <form action="" onSubmit={blockSubmit}>
        <fieldset>
          <legend>Search Transaction Area</legend>

          <label htmlFor="">
            enterprise
            <SelectItemArea
              itemName="enterprise"
              api={new EnterpriseApi()}
              returnSelectedValue={getSelectedValue}
            />
          </label>

          <label htmlFor="">
            date
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={changeField}
            />
          </label>

          <button type="button" onClick={createTransaction}>
            Adicionar
          </button>
          <button type="button" onClick={getTransaction}>
            Buscar
          </button>
          <button type="button" onClick={updateTransaction}>
            Atualizar
          </button>
          <button type="button" onClick={deleteTransaction}>
            Deletar
          </button>
        </fieldset>
      </form>
    </div>
  );
};
