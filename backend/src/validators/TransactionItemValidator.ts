import { Request } from "express";
import { ITransactionItemValidator } from "./ITransactionItemValidator";

export class TransactionItemValidator implements ITransactionItemValidator {
  validate(req: Request): void {
    this.validateTransaction(req);
    this.validateItem(req);
    this.validateBrand(req);
    this.validateCategory(req);
    this.validateQuantity(req);
    this.validateTotalValue(req);
    this.validateUnitOfMeasurement(req);
  }
  validateTransaction(req: Request): void {
    this.validateText(req, "transaction");
  }
  validateItem(req: Request): void {
    this.validateText(req, "item");
  }
  validateBrand(req: Request): void {
    this.validateText(req, "brand");
  }
  validateCategory(req: Request): void {
    this.validateText(req, "category");
  }
  validateQuantity(req: Request): void {
    this.validateNumber(req, "quantity");
  }
  validateTotalValue(req: Request): void {
    this.validateNumber(req, "totalValue");
  }
  validateUnitOfMeasurement(req: Request): void {
    this.validateText(req, "unitOfMeasurement");
  }
  private validateText(req: Request, field: string): void {
    if (!req.body[field] || req.body[field] === "")
      throw new Error(`Missing ${field}.`);
  }
  private validateNumber(req: Request, field: string): void {
    if (!req.body[field]) throw new Error(`Missing ${field}.`);
    if (isNaN(req.body[field])) throw new Error(`Invalid ${field}.`);
  }
}
