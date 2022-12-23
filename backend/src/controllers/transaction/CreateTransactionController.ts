import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import {
  createTransactionInput,
  createTransactionOutput,
} from "../../use-cases/transaction/CreateTransaction";
import { IValidator } from "../../validators/IValidator";
import { IController } from "../IController";

export class CreateTransactionController implements IController {
  constructor(
    private readonly useCase: IUseCase,
    private readonly validator: IValidator
  ) {}

  async handle(req: Request, res: Response) {
    try {
      this.validator.validate(req);
      const input: createTransactionInput = {
        enterprise: req.body.enterprise,
        date: new Date(req.body.date),
      };
      const transaction: createTransactionOutput = await this.useCase.execute(
        input
      );
      return res.status(201).json({ id: transaction.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
