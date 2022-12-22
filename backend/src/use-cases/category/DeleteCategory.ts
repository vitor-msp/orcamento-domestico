import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type deleteCategoryInput = {
  id: string;
};

export type deleteCategoryOutput = {
  id: string;
};

export class DeleteCategory implements IUseCase {
  constructor(private readonly categoriesRepository: IRepository) {}

  async execute(input: deleteCategoryInput): Promise<deleteCategoryOutput> {
    await this.categoriesRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
