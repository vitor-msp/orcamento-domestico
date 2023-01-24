import { AxiosInstance } from "axios";
import {
  TransactionItem,
  TransactionItemApiType,
} from "../domain/TransactionItem";
import { ITransactionItemApi } from "./ITransactionItemApi";

export class TransactionItemApi implements ITransactionItemApi {
  constructor(
    private readonly api: AxiosInstance,
    private readonly uri: string
  ) {}

  async create(entity: TransactionItem): Promise<TransactionItem | null> {
    try {
      const req: TransactionItemApiType = {
        ...entity,
        item: entity.item!.id,
        brand: entity.brand!.id,
        category: entity.category!.id,
      };
      console.log(entity);
      const res = await this.api.post<TransactionItemApiType>(
        `${this.uri}`,
        req
      );
      entity.id = res.data.id;
      console.log(entity);
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: TransactionItem): Promise<TransactionItem | null> {
    return entity;
  }

  async delete(entity: TransactionItem): Promise<void | null> {}
}
