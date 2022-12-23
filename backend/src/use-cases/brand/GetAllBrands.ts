import { brandDB, IBrandRepository } from "../../repositories/interfaces/IBrandRepository";
import { IUseCase } from "../IUseCase";

export type getAllBrandsOutput = {
  brands: brandDB[];
};

export class GetAllBrands implements IUseCase {
  constructor(private readonly brandsRepository: IBrandRepository) {}

  async execute(): Promise<getAllBrandsOutput> {
    const brands: brandDB[] = await this.brandsRepository.getAll();
    return {
      brands,
    };
  }
}
