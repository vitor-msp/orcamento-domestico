import { Enterprise } from "../../domain/Enterprise";
import { Transaction } from "../../domain/Transaction";
import { enterpriseDB } from "../../repositories/EnterprisesRepository";
import { IRepository } from "../../repositories/IRepository";
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
    private readonly enterprisesRepository: IRepository
  ) {}

  async execute(
    input: createTransactionInput
  ): Promise<createTransactionOutput> {
    const enterpriseDB: enterpriseDB = await this.enterprisesRepository.get(
      input.enterprise
    );
    const enterprise = new Enterprise({ id: enterpriseDB.id });
    const transactionExists = await this.transactionsRepository.exists(
      enterprise.getId(),
      input.date
    );
    if (transactionExists) throw new Error("Transaction already exists.");
    const transaction = new Transaction({ enterprise, date: input.date });
    await this.transactionsRepository.save(transaction);
    return {
      id: transaction.getId(),
    };
  }
}
