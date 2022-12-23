import { Enterprise } from "../../domain/Enterprise";
import { enterpriseDB, IEnterpriseRepository } from "../../repositories/interfaces/IEnterpriseRepository";
import { IUseCase } from "../IUseCase";

export type updateEnterpriseInput = {
  id: string;
  description: string;
};

export type updateEnterpriseOutput = {
  id: string;
};

export class UpdateEnterprise implements IUseCase {
  constructor(private readonly enterpriseRepository: IEnterpriseRepository) {}

  async execute(input: updateEnterpriseInput): Promise<updateEnterpriseOutput> {
    const enterpriseDB: enterpriseDB = await this.enterpriseRepository.get(
      input.id
    );
    const enterprise = new Enterprise({
      id: enterpriseDB.id,
      description: enterpriseDB.description,
    });
    enterprise.setDescription(input.description);
    await this.enterpriseRepository.save(enterprise);
    return {
      id: enterprise.getId(),
    };
  }
}
