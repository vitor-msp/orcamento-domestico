import { Category } from "../../domain/Category";
import { categoryDB, ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";
import { IUseCase } from "../IUseCase";

export type updateCategoryInput = {
  id: string;
  description: string;
};

export type updateCategoryOutput = {
  id: string;
};

export class UpdateCategory implements IUseCase {
  constructor(private readonly categoriesRepository: ICategoryRepository) {}

  async execute(input: updateCategoryInput): Promise<updateCategoryOutput> {
    const categoryDB: categoryDB = await this.categoriesRepository.get(
      input.id
    );
    const category = new Category({
      id: categoryDB.id,
      description: categoryDB.description,
    });
    category.setDescription(input.description);
    await this.categoriesRepository.save(category);
    return {
      id: category.getId(),
    };
  }
}
