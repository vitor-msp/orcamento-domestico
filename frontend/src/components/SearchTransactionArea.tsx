import { useState } from "react";
import { Item } from "../domain/Item";
import { Transaction } from "../domain/Transaction";
import { TransactionItem } from "../domain/TransactionItem";
import { ITransactionApi } from "../services/ITransactionApi";
import { FormUtils } from "../utils/FormUtils";
import { SelectItemArea } from "./SelectItemArea";
import "../design/styles.css";
import { enterpriseApi, transactionApi } from "..";

interface SearchTransactionAreaProps {
  updateTransactionItems: (transactionItems: TransactionItem[]) => void;
}

export const SearchTransactionArea = (props: SearchTransactionAreaProps) => {
  const api: ITransactionApi = transactionApi;
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
      const createdTransaction = await api.create(transaction);
      if (createdTransaction === null) {
        alert("Erro ao criar lançamento!");
        return;
      }
      setTransaction(createdTransaction);
      getTransaction();
    }
  };

  const updateTransaction = async (): Promise<void> => {
    const { id, enterprise, date } = transaction;
    if (fieldIsValid(id) && fieldIsValid(enterprise) && fieldIsValid(date)) {
      const updatedTransaction = await api.update(transaction);
      if (updatedTransaction === null) {
        alert("Erro ao atualizar lançamento!");
        return;
      }
    }
  };

  const deleteTransaction = async (): Promise<void> => {
    if (fieldIsValid(transaction.id)) {
      const deletedTransaction = await api.delete(transaction);
      if (deletedTransaction === null) {
        alert("Erro ao deletar lançamento!");
        return;
      }
    }
  };

  const getTransaction = async (): Promise<void> => {
    const { enterprise, date } = transaction;
    if (!fieldIsValid(enterprise) || !fieldIsValid(date)) return;
    const savedTransaction = await api.get(transaction);
    if (savedTransaction === null) {
      alert("Erro ao buscar lançamento!");
      return;
    }
    setTransaction({ ...savedTransaction });
    props.updateTransactionItems(savedTransaction.transactionItems ?? []);
  };

  return (
    <form action="" onSubmit={FormUtils.blockSubmit}>
      <h4>Lançamento</h4>
      <div>
        <div>
          <label htmlFor="select-item-area-input">empresa</label>
          <SelectItemArea
            itemName="enterprise"
            api={enterpriseApi}
            returnSelectedItem={getSelectedItem}
            canEdit={true}
          />
          <div>
            <label htmlFor="">date</label>
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={changeField}
            />
          </div>
        </div>

        <div className="buttons">
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
        </div>
      </div>
    </form>
  );
};
