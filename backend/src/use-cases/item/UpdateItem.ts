import { Item } from "../../domain/Item";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type updateItemInput = {
  id: string;
  description: string;
};

export type updateItemOutput = {
  id: string;
};

export class UpdateItem implements IUseCase {
  constructor(private readonly itemsRepository: IRepository) {}

  async execute(input: updateItemInput): Promise<updateItemOutput> {
    const item: Item = await this.itemsRepository.get(input.id);
    item.setDescription(input.description);
    await this.itemsRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
