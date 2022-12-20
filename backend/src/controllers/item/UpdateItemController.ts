import { Request, Response } from "express";
import { UpdateItem, updateItemInput } from "../../use-cases/item/UpdateItem";
import { IController } from "../IController";

export class UpdateItemController implements IController {
  constructor(private readonly useCase: UpdateItem) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.body.id) return res.status(400).json({ message: "Missing id." });
      if (!req.body.description)
        return res.status(400).json({ message: "Missing description." });
      const input: updateItemInput = {
        id: req.body.id,
        description: req.body.description,
      };
      const item = await this.useCase.execute(input);
      return res.status(200).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: "Internal error." });
    }
  }
}
