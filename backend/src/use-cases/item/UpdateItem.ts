import { Item } from "../../domain/Item";
import { IUseCase } from "../IUseCase";

export type updateItemInput = {
  id: string;
  description: string;
};

export type updateItemOutput = {
  id: string;
};

export class UpdateItem implements IUseCase {
  constructor(private readonly itemRepository: any) {}

  async execute(input: updateItemInput): Promise<updateItemOutput> {
    const item: Item = await this.itemRepository.get(input.id);
    item.setDescription(input.description);
    await this.itemRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
