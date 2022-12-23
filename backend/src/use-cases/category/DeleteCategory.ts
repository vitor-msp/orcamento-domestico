import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";
import { IUseCase } from "../IUseCase";

export type deleteCategoryInput = {
  id: string;
};

export type deleteCategoryOutput = {
  id: string;
};

export class DeleteCategory implements IUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: deleteCategoryInput): Promise<deleteCategoryOutput> {
    await this.categoryRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
