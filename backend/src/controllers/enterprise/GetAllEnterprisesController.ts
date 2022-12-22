import { Request, Response } from "express";
import { GetAllEnterprises } from "../../use-cases/enterprise/GetAllEnterprises";
import { IController } from "../IController";

export class GetAllEnterprisesController implements IController {
  constructor(private readonly useCase: GetAllEnterprises) {}

  async handle(req: Request, res: Response) {
    try {
      const { enterprises } = await this.useCase.execute();
      return res.status(200).json({ enterprises });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
