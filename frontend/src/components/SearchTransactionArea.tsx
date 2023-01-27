import { useState } from "react";
import { Item } from "../domain/Item";
import { Transaction } from "../domain/Transaction";
import { ITransactionApi } from "../services/api/ITransactionApi";
import { FormUtils } from "../utils/FormUtils";
import { SelectItemArea } from "./SelectItemArea";
import "../design/styles.css";
import { enterpriseApi, transactionApi } from "..";
import { FieldsValidator } from "../utils/FieldsValidator";

interface SearchTransactionAreaProps {
  updateTransaction: (transaction: Transaction) => void;
}

export const SearchTransactionArea = (props: SearchTransactionAreaProps) => {
  const emptyTransaction: Transaction = {
    id: "",
    enterprise: "",
    date: "",
  };
  const api: ITransactionApi = transactionApi;
  const [transaction, setTransaction] = useState<Transaction>(emptyTransaction);

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
    }
  };

  const updateTransaction = async (): Promise<void> => {
    if (!FieldsValidator.fieldsAreValid(Array.of(transaction))) return;
    const updatedTransaction = await api.update(transaction);
    if (updatedTransaction === null) {
      alert("Erro ao atualizar lançamento!");
      return;
    }
    setTransaction(updatedTransaction);
  };

  const deleteTransaction = async (): Promise<void> => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Deletar lançamento com todos os seus itens?")) return;
    if (fieldIsValid(transaction.id)) {
      const deletedTransaction = await api.delete(transaction);
      if (deletedTransaction === null) {
        alert("Erro ao deletar lançamento!");
        return;
      }
      setTransaction(emptyTransaction);
      props.updateTransaction({});
    }
  };

  const getTransaction = async (): Promise<void> => {
    if (!FieldsValidator.fieldsAreValid(Array.of(transaction))) return;
    const savedTransaction = await api.get(transaction);
    if (savedTransaction === null) {
      alert("Erro ao buscar lançamento!");
      return;
    }
    setTransaction({ ...savedTransaction });
    props.updateTransaction(savedTransaction);
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
              autoComplete={"off"}
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
