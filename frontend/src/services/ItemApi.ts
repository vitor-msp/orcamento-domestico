import { AxiosInstance } from "axios";
import { Item } from "../domain/Item";
import { IItemApi } from "./IItemApi";

export class ItemApi implements IItemApi {
  constructor(
    private readonly api: AxiosInstance,
    private readonly uri: string
  ) {}

  async create(entity: Item): Promise<Item | null> {
    try {
      const res = await this.api.post(`${this.uri}`, entity);
      entity = res.data;
      console.log(entity);
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: Item): Promise<Item | null> {
    try {
      const res = await this.api.post(`${this.uri}/${entity.id}`, entity);
      entity = res.data;
      console.log(entity);
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(entity: Item): Promise<void | null> {
    try {
      const res = await this.api.delete(`${this.uri}/${entity.id}`);
      entity = res.data;
      console.log(entity);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll(): Promise<Item[] | null> {
    try {
      const res = await this.api.get(`${this.uri}`);
      const entities: Item[] = res.data;
      console.log(entities);
      return entities;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
