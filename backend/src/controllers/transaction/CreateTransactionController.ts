import { Request, Response } from "express";
import {
  CreateTransaction,
  createTransactionInput,
} from "../../use-cases/transaction/CreateTransaction";
import { IValidator } from "../../validators/IValidator";
import { IController } from "../IController";

export class CreateTransactionController implements IController {
  constructor(
    private readonly useCase: CreateTransaction,
    private readonly validator: IValidator
  ) {}

  async handle(req: Request, res: Response) {
    try {
      this.validator.validate(req);
      const input: createTransactionInput = {
        enterprise: req.body.enterprise,
        date: req.body.date,
      };
      const item = await this.useCase.execute(input);
      return res.status(201).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
