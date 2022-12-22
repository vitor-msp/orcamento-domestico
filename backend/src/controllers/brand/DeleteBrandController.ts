import { Request, Response } from "express";
import { DeleteBrand, deleteBrandInput } from "../../use-cases/brand/DeleteBrand";
import { IController } from "../IController";

export class DeleteBrandController implements IController {
  constructor(private readonly useCase: DeleteBrand) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      const input: deleteBrandInput = {
        id: req.params.id,
      };
      const item = await this.useCase.execute(input);
      return res.status(200).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
