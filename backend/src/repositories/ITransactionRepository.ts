export interface ITransactionRepository {
  save(entity: any): Promise<void>;
  // delete(id: string): Promise<void>;
  // get(id: string): Promise<any>;
}