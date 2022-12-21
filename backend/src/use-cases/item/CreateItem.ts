import { Item } from "../../domain/Item";
import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

export type createItemInput = {
  description: string;
};

export type createItemOutput = {
  id: string;
};

export class CreateItem implements IUseCase {
  constructor(private readonly itemsRepository: IRepository) {}

  async execute(input: createItemInput): Promise<createItemOutput> {
    const item = new Item({ description: input.description });
    await this.itemsRepository.save(item);
    return {
      id: item.getId(),
    };
  }
}
