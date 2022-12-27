import { Transaction } from "../../domain/Transaction";

export type transactionDB = {
  id: string;
  enterprise: string;
  date: string;
};

export interface ITransactionRepository {
  save(entity: Transaction): Promise<void>;
  exists(enterpriseID: string, date: Date): Promise<boolean>;
  getById(id: string): Promise<transactionDB>;
  getByEnterpriseAndDate(enterprise: string, date: Date): Promise<transactionDB>;
  delete(id: string): Promise<void>;
}
