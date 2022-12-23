import { Enterprise } from "../../domain/Enterprise";
import { Transaction } from "../../domain/Transaction";
import { enterpriseDB } from "../../repositories/EnterprisesRepository";
import { IRepository } from "../../repositories/IRepository";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { transactionDB } from "../../repositories/TransactionsRepository";
import { IUseCase } from "../IUseCase";

export type updateTransactionInput = {
  id: string;
  enterprise?: string;
  date?: Date;
};

export type updateTransactionOutput = {
  id: string;
};

export class UpdateTransaction implements IUseCase {
  constructor(
    private readonly transactionsRepository: ITransactionRepository,
    private readonly enterprisesRepository: IRepository
  ) {}

  async execute(
    input: updateTransactionInput
  ): Promise<updateTransactionOutput> {
    const { id, enterprise, date }: transactionDB =
      await this.transactionsRepository.get(input.id);
    const transaction = new Transaction({
      id,
      enterprise: new Enterprise({ id: enterprise }),
      date: new Date(date),
    });
    if (input.date) transaction.setDate(input.date);
    if (input.enterprise) {
      const enterpriseDB: enterpriseDB = await this.enterprisesRepository.get(
        input.enterprise
      );
      transaction.setEnterprise(new Enterprise({ id: enterpriseDB.id }));
    }
    await this.transactionsRepository.save(transaction);
    return {
      id: transaction.getId(),
    };
  }
}
