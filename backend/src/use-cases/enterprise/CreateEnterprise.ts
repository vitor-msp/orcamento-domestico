import { Enterprise } from "../../domain/Enterprise";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type createEnterpriseInput = {
  description: string;
};

export type createEnterpriseOutput = {
  id: string;
};

export class CreateEnterprise implements IUseCase {
  constructor(private readonly enterprisesRepository: IRepository) {}

  async execute(input: createEnterpriseInput): Promise<createEnterpriseOutput> {
    const enterprise = new Enterprise({ description: input.description });
    await this.enterprisesRepository.save(enterprise);
    return {
      id: enterprise.getId(),
    };
  }
}
