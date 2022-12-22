import { Request, Response } from "express";
import { CreateCategory, createCategoryInput } from "../../use-cases/category/CreateCategory";
import { IController } from "../IController";

export class CreateCategoryController implements IController {
  constructor(private readonly useCase: CreateCategory) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.body.description)
        return res.status(400).json({ message: "Missing description." });
      const input: createCategoryInput = {
        description: req.body.description,
      };
      const item = await this.useCase.execute(input);
      return res.status(201).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
