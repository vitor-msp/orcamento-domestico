import { categoryDB, ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";
import { IUseCase } from "../IUseCase";

export type getAllCategoriesOutput = {
  categories: categoryDB[];
};

export class GetAllCategories implements IUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<getAllCategoriesOutput> {
    const categories: categoryDB[] = await this.categoryRepository.getAll();
    return {
      categories,
    };
  }
}
