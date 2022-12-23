export interface ITransactionRepository {
  save(entity: any): Promise<void>;
  exists(enterpriseID: string, date: Date): Promise<boolean>;
  get(id: string): Promise<any>;
  // delete(id: string): Promise<void>;
}
