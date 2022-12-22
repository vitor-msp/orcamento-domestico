import { categoryDB } from "../../repositories/CategoriesRepository";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type getAllCategoriesOutput = {
  categories: categoryDB[];
};

export class GetAllCategories implements IUseCase {
  constructor(private readonly categoriesRepository: IRepository) {}

  async execute(): Promise<getAllCategoriesOutput> {
    const categories: categoryDB[] = await this.categoriesRepository.getAll();
    return {
      categories,
    };
  }
}
