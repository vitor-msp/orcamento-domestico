import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import {
  updateTransactionItemInput,
  updateTransactionItemOutput,
} from "../../use-cases/transaction-item/UpdateTransactionItem";
import { ITransactionItemValidator } from "../../validators/ITransactionItemValidator";
import { IController } from "../IController";

export class UpdateTransactionItemController implements IController {
  constructor(
    private readonly useCase: IUseCase,
    private readonly validator: ITransactionItemValidator
  ) {}

  async handle(req: Request, res: Response) {
    try {
      this.validator.validateToUpdate(req);
      const input: updateTransactionItemInput = {
        id: req.params.id,
      };
      if (req.body.item) input.item = req.body.item;
      if (req.body.brand) input.brand = req.body.brand;
      if (req.body.category) input.category = req.body.category;
      if (req.body.quantity) input.quantity = req.body.quantity;
      if (req.body.totalValue) input.totalValue = req.body.totalValue;
      if (req.body.unitOfMeasurement)
        input.unitOfMeasurement = req.body.unitOfMeasurement;
      const transactionItem: updateTransactionItemOutput =
        await this.useCase.execute(input);
      return res.status(200).json({ id: transactionItem.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
