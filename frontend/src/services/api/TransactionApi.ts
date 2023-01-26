import { AxiosInstance } from "axios";
import { Transaction, TransactionApiType } from "../../domain/Transaction";
import { ITransactionApi } from "./ITransactionApi";

export class TransactionApi implements ITransactionApi {
  constructor(
    private readonly api: AxiosInstance,
    private readonly uri: string
  ) {}

  async create(entity: Transaction): Promise<Transaction | null> {
    try {
      const res = await this.api.post<Transaction>(`${this.uri}`, entity);
      entity.id = res.data.id;
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: Transaction): Promise<Transaction | null> {
    try {
      const res = await this.api.put<Transaction>(
        `${this.uri}/${entity.id}`,
        entity
      );
      entity.id = res.data.id;
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(entity: Transaction): Promise<void | null> {
    try {
      const res = await this.api.delete<Transaction>(
        `${this.uri}/${entity.id}`
      );
      entity.id = res.data.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async get(entity: Transaction): Promise<Transaction | null> {
    try {
      const res = await this.api.get<TransactionApiType>(
        `${this.uri}?enterprise=${entity.enterprise}&date=${entity.date}`
      );
      entity.id = res.data.id;
      entity.date = res.data.date;
      entity.enterprise = res.data.enterprise;
      entity.transactionItems = res.data.items!.map(
        (item) => {
          return {
            id: item.id,
            transaction: item.transaction,
            quantity: item.quantity,
            unitOfMeasurement: item.unitOfMeasurement,
            totalValue: item.totalValue,
            item: { id: item.item!, description: "" },
            brand: { id: item.brand!, description: "" },
            category: { id: item.category!, description: "" },
          };
        }
      );
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
