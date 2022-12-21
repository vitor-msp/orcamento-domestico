import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type deleteItemInput = {
  id: string;
};

export type deleteItemOutput = {
  id: string;
};

export class DeleteItem implements IUseCase {
  constructor(private readonly itemsRepository: IRepository) {}

  async execute(input: deleteItemInput): Promise<deleteItemOutput> {
    await this.itemsRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
