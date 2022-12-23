import { IBrandRepository } from "../../repositories/interfaces/IBrandRepository";
import { IUseCase } from "../IUseCase";

export type deleteBrandInput = {
  id: string;
};

export type deleteBrandOutput = {
  id: string;
};

export class DeleteBrand implements IUseCase {
  constructor(private readonly brandsRepository: IBrandRepository) {}

  async execute(input: deleteBrandInput): Promise<deleteBrandOutput> {
    await this.brandsRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
