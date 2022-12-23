import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import {
  createTransactionItemInput,
  createTransactionItemOutput,
} from "../../use-cases/transaction-item/CreateTransactionItem";
import { ITransactionItemValidator } from "../../validators/ITransactionItemValidator";
import { IController } from "../IController";

export class CreateTransactionItemController implements IController {
  constructor(
    private readonly useCase: IUseCase,
    private readonly validator: ITransactionItemValidator
  ) {}

  async handle(req: Request, res: Response) {
    try {
      this.validator.validateToCreate(req);
      const input: createTransactionItemInput = {
        transaction: req.body.transaction,
        item: req.body.item,
        brand: req.body.brand,
        category: req.body.category,
        quantity: req.body.quantity,
        totalValue: req.body.totalValue,
        unitOfMeasurement: req.body.unitOfMeasurement,
      };
      const transactionItem: createTransactionItemOutput =
        await this.useCase.execute(input);
      return res.status(201).json({ id: transactionItem.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
