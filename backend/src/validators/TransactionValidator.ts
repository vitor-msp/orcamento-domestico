import { Request } from "express";
import { ITransactionValidator } from "./ITransactionValidator";

export class TransactionValidator implements ITransactionValidator {
  constructor() {}

  validateEnterprise(req: Request): void {
    if (!req.body.enterprise || req.body.enterprise === "")
      throw new Error("Missing enterprise.");
  }

  validateDate(req: Request): void {
    if (!req.body.date || req.body.date === "")
      throw new Error("Missing date.");
    try {
      new Date(req.body.date);
    } catch (error) {
      throw new Error("Invalid date.");
    }
  }
}
