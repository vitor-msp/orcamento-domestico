import { ITransactionItemRepository } from "../../repositories/interfaces/ITransactionItemRepository";
import { IUseCase } from "../IUseCase";

export type deleteTransactionItemInput = {
  id: string;
};

export type deleteTransactionItemOutput = {
  id: string;
};

export class DeleteTransactionItem implements IUseCase {
  constructor(
    private readonly transactionItemRepository: ITransactionItemRepository
  ) {}

  async execute(
    input: deleteTransactionItemInput
  ): Promise<deleteTransactionItemOutput> {
    await this.transactionItemRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
