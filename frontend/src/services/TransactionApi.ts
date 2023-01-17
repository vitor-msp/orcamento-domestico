import { Transaction } from "../domain/Transaction";
import { ITransactionApi } from "./ITransactionApi";

export class TransactionApi implements ITransactionApi {
  async create(entity: Transaction): Promise<Transaction> {
    entity.id = "1";
    console.log(entity);
    return entity;
  }

  async update(id: string, entity: Transaction): Promise<Transaction> {
    console.log(entity);
    return entity;
  }

  async delete(id: string): Promise<void> {}

  async get(entity: Transaction): Promise<Transaction> {
    return {
      id: "1",
      enterprise: "1",
      date: "",
      transactionItems: [
        {
          id: "1",
          brand: { id: "1", description: "ipe" },
          category: { id: "1", description: "limpeza" },
          item: { id: "1", description: "detergente" },
          totalValue: 5,
          quantity: 1,
          unitOfMeasurement: "300mL",
        },
        {
          id: "2",
          brand: { id: "2", description: "minuano" },
          category: { id: "1", description: "limpeza" },
          item: { id: "1", description: "detergente" },
          totalValue: 6.5,
          quantity: 2,
          unitOfMeasurement: "350mL",
        },
      ],
    };
  }
}
