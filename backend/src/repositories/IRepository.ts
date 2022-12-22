export interface IRepository {
  save(entity: any): Promise<void>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<any>;
  getAll(): Promise<any[]>;
}