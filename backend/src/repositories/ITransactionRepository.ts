export interface ITransactionRepository {
  save(entity: any): Promise<void>;
  exists(enterpriseID: string, date: Date): Promise<boolean>;
  // delete(id: string): Promise<void>;
  // get(id: string): Promise<any>;
}
