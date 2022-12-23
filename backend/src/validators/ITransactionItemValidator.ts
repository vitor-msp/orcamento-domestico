export interface ITransactionItemValidator {
  validate(req: any): void;
  validateTransaction(req: any): void;
  validateItem(req: any): void;
  validateBrand(req: any): void;
  validateCategory(req: any): void;
  validateQuantity(req: any): void;
  validateTotalValue(req: any): void;
  validateUnitOfMeasurement(req: any): void;
}