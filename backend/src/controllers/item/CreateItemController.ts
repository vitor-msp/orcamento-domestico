import { Request, Response } from "express";
import { createItemInput } from "../../use-cases/item/CreateItem";
import { IUseCase } from "../../use-cases/IUseCase";
import { IController } from "../IController";

export class CreateItemController implements IController {
  constructor(private readonly useCase: IUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.body.description)
        return res.status(400).json({ message: "Missing description." });
      const input: createItemInput = {
        description: req.body.description,
      };
      const item = await this.useCase.execute(input);
      return res.status(201).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
