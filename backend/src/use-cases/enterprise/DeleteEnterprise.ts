import { IEnterpriseRepository } from "../../repositories/interfaces/IEnterpriseRepository";
import { IUseCase } from "../IUseCase";

export type deleteEnterpriseInput = {
  id: string;
};

export type deleteEnterpriseOutput = {
  id: string;
};

export class DeleteEnterprise implements IUseCase {
  constructor(private readonly enterpriseRepository: IEnterpriseRepository) {}

  async execute(input: deleteEnterpriseInput): Promise<deleteEnterpriseOutput> {
    await this.enterpriseRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
