import { Brand } from "../../domain/Brand";
import { IBrandRepository } from "../../repositories/interfaces/IBrandRepository";
import { IUseCase } from "../IUseCase";

export type createBrandInput = {
  description: string;
};

export type createBrandOutput = {
  id: string;
};

export class CreateBrand implements IUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(input: createBrandInput): Promise<createBrandOutput> {
    const brand = new Brand({ description: input.description });
    await this.brandRepository.save(brand);
    return {
      id: brand.getId(),
    };
  }
}
