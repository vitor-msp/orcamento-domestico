import { Request, Response } from "express";
import { deleteItemInput } from "../../use-cases/item/DeleteItem";
import { IUseCase } from "../../use-cases/IUseCase";
import { IController } from "../IController";

export class DeleteItemController implements IController {
  constructor(private readonly useCase: IUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      const input: deleteItemInput = {
        id: req.params.id,
      };
      const item = await this.useCase.execute(input);
      return res.status(200).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
