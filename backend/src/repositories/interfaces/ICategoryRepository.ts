import { Category } from "../../domain/Category";

export type categoryDB = {
  id: string;
  description: string;
};

export interface ICategoryRepository {
  save(entity: Category): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<categoryDB>;
  getAll(): Promise<categoryDB[]>;
}
