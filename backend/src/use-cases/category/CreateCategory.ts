import { Category } from "../../domain/Category";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type createCategoryInput = {
  description: string;
};

export type createCategoryOutput = {
  id: string;
};

export class CreateCategory implements IUseCase {
  constructor(private readonly categoriesRepository: IRepository) {}

  async execute(input: createCategoryInput): Promise<createCategoryOutput> {
    const category = new Category({ description: input.description });
    await this.categoriesRepository.save(category);
    return {
      id: category.getId(),
    };
  }
}
