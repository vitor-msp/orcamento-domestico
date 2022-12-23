import { Enterprise } from "../../domain/Enterprise";
import { IEnterpriseRepository } from "../../repositories/interfaces/IEnterpriseRepository";
import { IUseCase } from "../IUseCase";

export type createEnterpriseInput = {
  description: string;
};

export type createEnterpriseOutput = {
  id: string;
};

export class CreateEnterprise implements IUseCase {
  constructor(private readonly enterpriseRepository: IEnterpriseRepository) {}

  async execute(input: createEnterpriseInput): Promise<createEnterpriseOutput> {
    const enterprise = new Enterprise({ description: input.description });
    await this.enterpriseRepository.save(enterprise);
    return {
      id: enterprise.getId(),
    };
  }
}
