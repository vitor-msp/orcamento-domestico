import { enterpriseDB, IEnterpriseRepository } from "../../repositories/interfaces/IEnterpriseRepository";
import { IUseCase } from "../IUseCase";

export type getAllEnterprisesOutput = {
  enterprises: enterpriseDB[];
};

export class GetAllEnterprises implements IUseCase {
  constructor(private readonly enterpriseRepository: IEnterpriseRepository) {}

  async execute(): Promise<getAllEnterprisesOutput> {
    const enterprises: enterpriseDB[] =
      await this.enterpriseRepository.getAll();
    return {
      enterprises,
    };
  }
}
