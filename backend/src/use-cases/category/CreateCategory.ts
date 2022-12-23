import { Category } from "../../domain/Category";
import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";
import { IUseCase } from "../IUseCase";

export type createCategoryInput = {
  description: string;
};

export type createCategoryOutput = {
  id: string;
};

export class CreateCategory implements IUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: createCategoryInput): Promise<createCategoryOutput> {
    const category = new Category({ description: input.description });
    await this.categoryRepository.save(category);
    return {
      id: category.getId(),
    };
  }
}
