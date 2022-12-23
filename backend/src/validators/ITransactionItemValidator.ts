export interface ITransactionItemValidator {
  validateToCreate(req: any): void;
  validateToUpdate(req: any): void;
}