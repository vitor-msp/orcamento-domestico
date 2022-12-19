import { IUseCase } from "../IUseCase";

export type deleteItemInput = {
  id: string;
};

export type deleteItemOutput = {
  id: string;
};

export class DeleteItem implements IUseCase {
  constructor(private readonly itemRepository: any) {}

  async execute(input: deleteItemInput): Promise<deleteItemOutput> {
    await this.itemRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
