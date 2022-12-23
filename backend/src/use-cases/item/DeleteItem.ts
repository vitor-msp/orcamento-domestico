import { IItemRepository } from "../../repositories/interfaces/IItemRepository";
import { IUseCase } from "../IUseCase";

export type deleteItemInput = {
  id: string;
};

export type deleteItemOutput = {
  id: string;
};

export class DeleteItem implements IUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(input: deleteItemInput): Promise<deleteItemOutput> {
    await this.itemRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
