export interface ITransactionValidator {
  validateEnterprise(req: any): void;
  validateDate(req: any): void;
}
