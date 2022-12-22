import { Request, Response } from "express";
import { UpdateBrand, updateBrandInput } from "../../use-cases/brand/UpdateBrand";
import { IController } from "../IController";

export class UpdateBrandController implements IController {
  constructor(private readonly useCase: UpdateBrand) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      if (!req.body.description)
        return res.status(400).json({ message: "Missing description." });
      const input: updateBrandInput = {
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
