import { IRepository } from "../../repositories/IRepository";
import { itemDB } from "../../repositories/ItemsRepository";
import { IUseCase } from "../IUseCase";

export type getAllItemsOutput = {
  items: itemDB[];
};

export class GetAllItems implements IUseCase {
  constructor(private readonly itemsRepository: IRepository) {}

  async execute(): Promise<getAllItemsOutput> {
    const items: itemDB[] = await this.itemsRepository.getAll();
    return {
      items,
    };
  }
}
