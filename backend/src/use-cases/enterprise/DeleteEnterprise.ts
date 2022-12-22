import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type deleteEnterpriseInput = {
  id: string;
};

export type deleteEnterpriseOutput = {
  id: string;
};

export class DeleteEnterprise implements IUseCase {
  constructor(private readonly enterprisesRepository: IRepository) {}

  async execute(input: deleteEnterpriseInput): Promise<deleteEnterpriseOutput> {
    await this.enterprisesRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
