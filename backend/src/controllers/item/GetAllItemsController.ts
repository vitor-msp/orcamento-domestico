import { Request, Response } from "express";
import { IUseCase } from "../../use-cases/IUseCase";
import { IController } from "../IController";

export class GetAllItemsController implements IController {
  constructor(private readonly useCase: IUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const { items } = await this.useCase.execute();
      return res.status(200).json({ items });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
