import { Item } from "../../domain/Item";
import { IItemRepository } from "../../repositories/interfaces/IItemRepository";
import { IUseCase } from "../IUseCase";

export type createItemInput = {
  description: string;
};

export type createItemOutput = {
  id: string;
};

export class CreateItem implements IUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(input: createItemInput): Promise<createItemOutput> {
    const item = new Item({ description: input.description });
    await this.itemRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
