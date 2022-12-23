import { Brand } from "../../domain/Brand";
import { brandDB, IBrandRepository } from "../../repositories/interfaces/IBrandRepository";
import { IUseCase } from "../IUseCase";

export type updateBrandInput = {
  id: string;
  description: string;
};

export type updateBrandOutput = {
  id: string;
};

export class UpdateBrand implements IUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  async execute(input: updateBrandInput): Promise<updateBrandOutput> {
    const brandDB: brandDB = await this.brandRepository.get(input.id);
    const item = new Brand({
      id: brandDB.id,
      description: brandDB.description,
    });
    item.setDescription(input.description);
    await this.brandRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
