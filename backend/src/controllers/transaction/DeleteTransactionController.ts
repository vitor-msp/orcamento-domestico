import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import { deleteTransactionItemOutput } from "../../use-cases/transaction-item/DeleteTransactionItem";
import { deleteTransactionInput } from "../../use-cases/transaction/DeleteTransaction";
import { IController } from "../IController";

export class DeleteTransactionController implements IController {
  constructor(private readonly useCase: IUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      const input: deleteTransactionInput = {
        id: req.params.id,
      };
      const item: deleteTransactionItemOutput = await this.useCase.execute(
        input
      );
      return res.status(200).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
