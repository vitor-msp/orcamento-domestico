import { Enterprise } from "../../domain/Enterprise";
import { Transaction } from "../../domain/Transaction";
import { EnterprisesRepository } from "../../repositories/EnterprisesRepository";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { IUseCase } from "../IUseCase";

export type createTransactionInput = {
  enterprise: string;
  date: Date;
};

export type createTransactionOutput = {
  id: string;
};

export class CreateTransaction implements IUseCase {
  constructor(
    private readonly transactionsRepository: ITransactionRepository,
    private readonly enterprisesRepository: EnterprisesRepository
  ) {}

  async execute(
    input: createTransactionInput
  ): Promise<createTransactionOutput> {
    const { id, description } = await this.enterprisesRepository.get(
      input.enterprise
    );
    const enterprise = new Enterprise({ id });
    const transaction = new Transaction({ enterprise, date: input.date });
    await this.transactionsRepository.save(transaction);
    return {
      id: transaction.getId(),
    };
  }
}
