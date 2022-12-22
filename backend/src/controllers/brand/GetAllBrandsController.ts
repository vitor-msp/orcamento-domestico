import { Request, Response } from "express";
import { GetAllBrands } from "../../use-cases/brand/GetAllBrands";
import { IController } from "../IController";

export class GetAllBrandsController implements IController {
  constructor(private readonly useCase: GetAllBrands) {}

  async handle(req: Request, res: Response) {
    try {
      const { brands } = await this.useCase.execute();
      return res.status(200).json({ brands });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
