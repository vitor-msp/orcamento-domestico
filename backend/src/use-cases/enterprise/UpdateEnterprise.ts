import { Enterprise } from "../../domain/Enterprise";
import { enterpriseDB } from "../../repositories/EnterprisesRepository";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type updateEnterpriseInput = {
  id: string;
  description: string;
};

export type updateEnterpriseOutput = {
  id: string;
};

export class UpdateEnterprise implements IUseCase {
  constructor(private readonly enterprisesRepository: IRepository) {}

  async execute(input: updateEnterpriseInput): Promise<updateEnterpriseOutput> {
    const enterpriseDB: enterpriseDB = await this.enterprisesRepository.get(input.id);
    const enterprise = new Enterprise({ id: enterpriseDB.id, description: enterpriseDB.description });
    enterprise.setDescription(input.description);
    await this.enterprisesRepository.save(enterprise);
    return {
      id: enterprise.getId(),
    };
  }
}
