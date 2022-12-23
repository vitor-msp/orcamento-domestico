import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import {
  getTransactionInput,
  getTransactionOutput,
} from "../../use-cases/transaction/GetTransaction";
import { ITransactionValidator } from "../../validators/ITransactionValidator";
import { IController } from "../IController";

export class GetTransactionController implements IController {
  constructor(
    private readonly useCase: IUseCase,
    private readonly validator: ITransactionValidator
  ) {}

  async handle(req: Request, res: Response) {
    try {
      this.validator.validateEnterprise(req);
      this.validator.validateDate(req);
      const input: getTransactionInput = {
        enterprise: req.body.enterprise,
        date: new Date(req.body.date),
      };
      const transaction: getTransactionOutput = await this.useCase.execute(
        input
      );
      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
