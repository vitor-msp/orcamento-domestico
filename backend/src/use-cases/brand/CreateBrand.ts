import { Brand } from "../../domain/Brand";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type createBrandInput = {
  description: string;
};

export type createBrandOutput = {
  id: string;
};

export class CreateBrand implements IUseCase {
  constructor(private readonly brandsRepository: IRepository) {}

  async execute(input: createBrandInput): Promise<createBrandOutput> {
    const brand = new Brand({ description: input.description });
    await this.brandsRepository.save(brand);
    return {
      id: brand.getId(),
    };
  }
}
