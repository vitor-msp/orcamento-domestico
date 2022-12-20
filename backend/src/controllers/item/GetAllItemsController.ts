import { Request, Response } from "express";
import { GetAllItems } from "../../use-cases/item/GetAllItems";
import { IController } from "../IController";

export class GetAllItemsController implements IController {
  constructor(private readonly useCase: GetAllItems) {}

  async handle(req: Request, res: Response) {
    try {
      const { items } = await this.useCase.execute();
      return res.status(200).json({ items });
    } catch (error) {
      return res.status(500).json({ message: "Internal error." });
    }
  }
}
