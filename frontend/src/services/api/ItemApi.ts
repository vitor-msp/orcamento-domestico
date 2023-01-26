import { AxiosInstance } from "axios";
import { Item } from "../../domain/Item";
import { IItemApi } from "./IItemApi";

export class ItemApi implements IItemApi {
  private readonly api: AxiosInstance;
  private readonly uri: string;
  private readonly entityName: string;

  constructor(api: AxiosInstance, uri: string, entityName: string) {
    this.api = api;
    this.uri = `${uri}/${entityName}`;
    this.entityName = entityName;
  }

  async create(entity: Item): Promise<Item | null> {
    try {
      const res = await this.api.post<Item>(`${this.uri}`, entity);
      entity.id = res.data.id;
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: Item): Promise<Item | null> {
    try {
      const res = await this.api.put<Item>(`${this.uri}/${entity.id}`, entity);
      entity.id = res.data.id;
      return entity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(entity: Item): Promise<void | null> {
    try {
      const res = await this.api.delete<Item>(`${this.uri}/${entity.id}`);
      entity.id = res.data.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll(): Promise<Item[] | null> {
    try {
      const res = await this.api.get(`${this.uri}`);
      const entities: Item[] = res.data[this.entityName];
      return entities;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
