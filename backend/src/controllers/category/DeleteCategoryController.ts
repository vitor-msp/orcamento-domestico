import { Request, Response } from "express";
import { DeleteCategory, deleteCategoryInput } from "../../use-cases/category/DeleteCategory";
import { IController } from "../IController";

export class DeleteCategoryController implements IController {
  constructor(private readonly useCase: DeleteCategory) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      const input: deleteCategoryInput = {
        id: req.params.id,
      };
      const item = await this.useCase.execute(input);
      return res.status(200).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
