import { brandDB } from "../../repositories/BrandsRepository";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type getAllBrandsOutput = {
  brands: brandDB[];
};

export class GetAllBrands implements IUseCase {
  constructor(private readonly brandsRepository: IRepository) {}

  async execute(): Promise<getAllBrandsOutput> {
    const brands: brandDB[] = await this.brandsRepository.getAll();
    return {
      brands,
    };
  }
}
