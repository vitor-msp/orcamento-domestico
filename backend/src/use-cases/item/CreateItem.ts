import { Item } from "../../domain/Item";
import { IUseCase } from "../IUseCase";

export type createItemInput = {
  description: string;
};

export type createItemOutput = {
  id: string;
};

export class CreateItem implements IUseCase {
  constructor(private readonly itemRepository: any) {}

  async execute(input: createItemInput): Promise<createItemOutput> {
    const item = new Item({ description: input.description });
    await this.itemRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
