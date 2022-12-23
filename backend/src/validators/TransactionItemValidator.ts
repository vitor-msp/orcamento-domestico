import { Request } from "express";
import { ITransactionItemValidator } from "./ITransactionItemValidator";

export class TransactionItemValidator implements ITransactionItemValidator {
  validateToCreate(req: Request): void {
    this.validateText(req, "transaction");
    this.validateText(req, "item");
    this.validateText(req, "brand");
    this.validateText(req, "category");
    this.validateNumber(req, "quantity");
    this.validateNumber(req, "totalValue");
    this.validateText(req, "unitOfMeasurement");
  }

  validateToUpdate(req: Request): void {
    if (!req.params.id || req.params.id === "") throw new Error(`Missing id.`);
    if (req.body.item !== undefined) this.validateText(req, "item");
    if (req.body.brand !== undefined) this.validateText(req, "brand");
    if (req.body.category !== undefined) this.validateText(req, "category");
    if (req.body.quantity !== undefined) this.validateNumber(req, "quantity");
    if (req.body.totalValue !== undefined)
      this.validateNumber(req, "totalValue");
    if (req.body.unitOfMeasurement !== undefined)
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
