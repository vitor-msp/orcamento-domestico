import { IItemRepository, itemDB } from "../../repositories/interfaces/IItemRepository";
import { IUseCase } from "../IUseCase";

export type getAllItemsOutput = {
  items: itemDB[];
};

export class GetAllItems implements IUseCase {
  constructor(private readonly itemsRepository: IItemRepository) {}

  async execute(): Promise<getAllItemsOutput> {
    const items: itemDB[] = await this.itemsRepository.getAll();
    return {
      items,
    };
  }
}
