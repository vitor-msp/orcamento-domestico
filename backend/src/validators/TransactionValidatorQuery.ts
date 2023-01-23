import { Request } from "express";
import { ITransactionValidator } from "./ITransactionValidator";

export class TransactionValidatorQuery implements ITransactionValidator {
  constructor() {}

  validateEnterprise(req: Request): void {
    if (!req.query.enterprise || req.query.enterprise.toString() === "")
      throw new Error("Missing enterprise.");
  }

  validateDate(req: Request): void {
    if (!req.query.date || req.query.date.toString() === "")
      throw new Error("Missing date.");
    try {
      new Date(req.query.date.toString());
    } catch (error) {
      throw new Error("Invalid date.");
    }
  }
}
