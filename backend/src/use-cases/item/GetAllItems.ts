import { IRepository } from "../../repositories/IRepository";
import { IUseCase } from "../IUseCase";

type item = {
  id: string;
  description: string;
};

export type getAllItemsOutput = {
  items: item[];
};

export class GetAllItems implements IUseCase {
  constructor(private readonly itemsRepository: IRepository) {}

  async execute(): Promise<getAllItemsOutput> {
    return await this.itemsRepository.getAll();
  }
}
