import { Enterprise } from "../../domain/Enterprise";
import { Transaction } from "../../domain/Transaction";
import { enterpriseDB, IEnterpriseRepository } from "../../repositories/interfaces/IEnterpriseRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
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
    private readonly transactionRepository: ITransactionRepository,
    private readonly enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute(
    input: createTransactionInput
  ): Promise<createTransactionOutput> {
    const enterpriseDB: enterpriseDB = await this.enterpriseRepository.get(
      input.enterprise
    );
    const enterprise = new Enterprise({ id: enterpriseDB.id });
    const transactionExists = await this.transactionRepository.exists(
      enterprise.getId(),
      input.date
    );
    if (transactionExists) throw new Error("Transaction already exists.");
    const transaction = new Transaction({ enterprise, date: input.date });
    await this.transactionRepository.save(transaction);
    return {
      id: transaction.getId(),
    };
  }
}
