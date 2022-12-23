import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import {
  updateTransactionInput,
  updateTransactionOutput,
} from "../../use-cases/transaction/UpdateTransaction";
import { ITransactionValidator } from "../../validators/ITransactionValidator";
import { IController } from "../IController";

export class UpdateTransactionController implements IController {
  constructor(
    private readonly useCase: IUseCase,
    private readonly validator: ITransactionValidator
  ) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      const input: updateTransactionInput = {
        id: req.params.id,
      };
      if (req.body.enterprise) {
        this.validator.validateEnterprise(req);
        input.enterprise = req.body.enterprise;
      }
      if (req.body.date) {
        this.validator.validateDate(req);
        input.date = new Date(req.body.date);
      }
      const transaction: updateTransactionOutput = await this.useCase.execute(
        input
      );
      return res.status(200).json({ id: transaction.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
