import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import {
  getTransactionInput,
  getTransactionOutput,
} from "../../use-cases/transaction/GetTransaction";
import { IController } from "../IController";

export class GetTransactionController implements IController {
  constructor(private readonly useCase: IUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      const input: getTransactionInput = {
        id: req.params.id,
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
