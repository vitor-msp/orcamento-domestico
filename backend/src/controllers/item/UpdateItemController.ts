import { Request, Response } from "express";
import { updateItemInput } from "../../use-cases/item/UpdateItem";
import { IUseCase } from "../../use-cases/IUseCase";
import { IController } from "../IController";

export class UpdateItemController implements IController {
  constructor(private readonly useCase: IUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      if (!req.body.description)
        return res.status(400).json({ message: "Missing description." });
      const input: updateItemInput = {
        id: req.params.id,
        description: req.body.description,
      };
      const item = await this.useCase.execute(input);
      return res.status(200).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
