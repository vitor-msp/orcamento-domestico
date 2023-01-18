import { useState } from "react";
import { Item } from "../domain/Item";
import { Transaction } from "../domain/Transaction";
import { TransactionItem } from "../domain/TransactionItem";
import { ItemApi } from "../services/ItemApi";
import { ITransactionApi } from "../services/ITransactionApi";
import { TransactionApi } from "../services/TransactionApi";
import { FormUtils } from "../utils/FormUtils";
import { SelectItemArea } from "./SelectItemArea";
import "../design/styles.css";

interface SearchTransactionAreaProps {
  updateTransactionItems: (transactionItems: TransactionItem[]) => void;
}

export const SearchTransactionArea = (props: SearchTransactionAreaProps) => {
  const api: ITransactionApi = new TransactionApi();
  const [transaction, setTransaction] = useState<Transaction>({
    id: "",
    enterprise: "",
    date: "",
  });

  const getSelectedItem = (item: Item): void => {
    setTransaction({ ...transaction, enterprise: item.id });
  };

  const changeField = (event: any): void => {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
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
      props.updateTransactionItems(savedTransaction.transactionItems!);
    }
  };

  return (
    <form action="" onSubmit={FormUtils.blockSubmit}>
      <fieldset>
        <legend>Lançamento</legend>

        <SelectItemArea
          itemName="enterprise"
          api={new ItemApi()}
          returnSelectedItem={getSelectedItem}
          canEdit={true}
        />

        <label htmlFor="">
          date
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={changeField}
          />
        </label>

        <button type="button" onClick={createTransaction} className="button">
          Adicionar
        </button>
        <button type="button" onClick={getTransaction} className="button">
          Buscar
        </button>
        <button type="button" onClick={updateTransaction} className="button">
          Atualizar
        </button>
        <button type="button" onClick={deleteTransaction} className="button">
          Deletar
        </button>
      </fieldset>
    </form>
  );
};
