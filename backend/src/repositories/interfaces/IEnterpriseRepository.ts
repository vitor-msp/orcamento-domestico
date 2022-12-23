import { Enterprise } from "../../domain/Enterprise";

export type enterpriseDB = {
  id: string;
  description: string;
};

export interface IEnterpriseRepository {
  save(entity: Enterprise): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<enterpriseDB>;
  getAll(): Promise<enterpriseDB[]>;
}
