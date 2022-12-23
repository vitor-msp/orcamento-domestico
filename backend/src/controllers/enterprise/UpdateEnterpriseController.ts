import { Request, Response } from "express";
import { updateEnterpriseInput } from "../../use-cases/enterprise/UpdateEnterprise";
import { IUseCase } from "../../use-cases/IUseCase";
import { IController } from "../IController";

export class UpdateEnterpriseController implements IController {
  constructor(private readonly useCase: IUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      if (!req.body.description)
        return res.status(400).json({ message: "Missing description." });
      const input: updateEnterpriseInput = {
        id: req.params.id,
        description: req.body.description,
      };
      const enterprise = await this.useCase.execute(input);
      return res.status(200).json({ id: enterprise.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
