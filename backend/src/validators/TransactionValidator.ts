import { Request } from "express";
import { IValidator } from "./IValidator";

export class TransactionValidator implements IValidator {
  constructor() {}

  validate(req: Request): void {
    this.validateEnterpise(req);
    this.validateDate(req);
  }

  private validateEnterpise(req: Request): void {
    if (!req.body.enterprise || req.body.enterprise === "")
      throw new Error("Missing enterprise.");
  }

  private validateDate(req: Request): void {
    if (!req.body.date || req.body.date === "")
      throw new Error("Missing date.");
    try {
      new Date(req.body.date);
    } catch (error) {
      throw new Error("Invalid date.");
    }
  }
}
