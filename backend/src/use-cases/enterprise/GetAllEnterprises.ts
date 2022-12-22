import { enterpriseDB } from "../../repositories/EnterprisesRepository";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type getAllEnterprisesOutput = {
  enterprises: enterpriseDB[];
};

export class GetAllEnterprises implements IUseCase {
  constructor(private readonly enterprisesRepository: IRepository) {}

  async execute(): Promise<getAllEnterprisesOutput> {
    const enterprises: enterpriseDB[] =
      await this.enterprisesRepository.getAll();
    return {
      enterprises,
    };
  }
}
