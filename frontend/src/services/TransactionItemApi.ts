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
      const res = await this.api.post<TransactionItemApiType>(
        `${this.uri}`,
        req
      );
      entity.id = res.data.id;
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: TransactionItem): Promise<TransactionItem | null> {
    try {
      const req: TransactionItemApiType = {
        ...entity,
        item: entity.item!.id,
        brand: entity.brand!.id,
        category: entity.category!.id,
      };
      const res = await this.api.put<TransactionItemApiType>(
        `${this.uri}/${entity.id}`,
        req
      );
      entity.id = res.data.id;
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(entity: TransactionItem): Promise<void | null> {
    try {
      const res = await this.api.delete<TransactionItemApiType>(
        `${this.uri}/${entity.id}`
      );
      entity.id = res.data.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
