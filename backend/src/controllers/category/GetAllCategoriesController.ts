import { Request, Response } from "express";
import { GetAllCategories } from "../../use-cases/category/GetAllCategories";
import { IController } from "../IController";

export class GetAllCategoriesController implements IController {
  constructor(private readonly useCase: GetAllCategories) {}

  async handle(req: Request, res: Response) {
    try {
      const { categories } = await this.useCase.execute();
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
