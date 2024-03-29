import { Item } from "../../domain/Item";
import { IItemRepository, itemDB } from "../../repositories/interfaces/IItemRepository";
import { IUseCase } from "../IUseCase";

export type updateItemInput = {
  id: string;
  description: string;
};

export type updateItemOutput = {
  id: string;
};

export class UpdateItem implements IUseCase {
  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(input: updateItemInput): Promise<updateItemOutput> {
    const itemDB: itemDB = await this.itemRepository.get(input.id);
    const item = new Item({ id: itemDB.id, description: itemDB.description });
    item.setDescription(input.description);
    await this.itemRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
