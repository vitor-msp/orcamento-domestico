import { ITransactionItemRepository } from "../../repositories/interfaces/ITransactionItemRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { IUseCase } from "../IUseCase";

export type deleteTransactionInput = {
  id: string;
};

export type deleteTransactionOutput = {
  id: string;
};

export class DeleteTransaction implements IUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionItemRepository: ITransactionItemRepository
  ) {}

  async execute(
    input: deleteTransactionInput
  ): Promise<deleteTransactionOutput> {
    await this.transactionItemRepository.deleteByTransaction(input.id);
    await this.transactionRepository.delete(input.id);
    return {
      id: input.id,
    };
  }
}
