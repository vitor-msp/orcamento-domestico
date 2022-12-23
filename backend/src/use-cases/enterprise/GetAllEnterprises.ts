import { enterpriseDB } from "../../repositories/implementations/EnterpriseRepository";
import { IEnterpriseRepository } from "../../repositories/interfaces/IEnterpriseRepository";
import { IUseCase } from "../IUseCase";

export type getAllEnterprisesOutput = {
  enterprises: enterpriseDB[];
};

export class GetAllEnterprises implements IUseCase {
  constructor(private readonly enterprisesRepository: IEnterpriseRepository) {}

  async execute(): Promise<getAllEnterprisesOutput> {
    const enterprises: enterpriseDB[] =
      await this.enterprisesRepository.getAll();
    return {
      enterprises,
    };
  }
}
