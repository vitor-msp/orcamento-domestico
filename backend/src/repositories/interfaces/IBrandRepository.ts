import { Brand } from "../../domain/Brand";

export type brandDB = {
  id: string;
  description: string;
};

export interface IBrandRepository {
  save(entity: Brand): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<brandDB>;
  getAll(): Promise<brandDB[]>;
}
