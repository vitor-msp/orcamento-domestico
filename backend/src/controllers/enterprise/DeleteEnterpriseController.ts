import { Request, Response } from "express";
import { DeleteEnterprise, deleteEnterpriseInput } from "../../use-cases/enterprise/DeleteEnterprise";
import { IController } from "../IController";

export class DeleteEnterpriseController implements IController {
  constructor(private readonly useCase: DeleteEnterprise) {}

  async handle(req: Request, res: Response) {
    try {
      if (!req.params.id)
        return res.status(400).json({ message: "Missing id." });
      const input: deleteEnterpriseInput = {
        id: req.params.id,
      };
      const item = await this.useCase.execute(input);
      return res.status(200).json({ id: item.id });
    } catch (error) {
      return res.status(500).json({ message: `Internal error - ${error}` });
    }
  }
}
