import { Brand } from "../../domain/Brand";
import { brandDB } from "../../repositories/BrandsRepository";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type updateBrandInput = {
  id: string;
  description: string;
};

export type updateBrandOutput = {
  id: string;
};

export class UpdateBrand implements IUseCase {
  constructor(private readonly brandsRepository: IRepository) {}

  async execute(input: updateBrandInput): Promise<updateBrandOutput> {
    const brandDB: brandDB = await this.brandsRepository.get(input.id);
    const item = new Brand({ id: brandDB.id, description: brandDB.description });
    item.setDescription(input.description);
    await this.brandsRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
