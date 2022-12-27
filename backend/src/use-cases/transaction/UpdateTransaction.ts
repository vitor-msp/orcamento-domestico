import { Enterprise } from "../../domain/Enterprise";
import { Transaction } from "../../domain/Transaction";
import { ITransactionRepository, transactionDB } from "../../repositories/interfaces/ITransactionRepository";
import { IUseCase } from "../IUseCase";
import { enterpriseDB, IEnterpriseRepository } from "../../repositories/interfaces/IEnterpriseRepository";

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
    private readonly transactionRepository: ITransactionRepository,
    private readonly enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute(
    input: updateTransactionInput
  ): Promise<updateTransactionOutput> {
    const { id, enterprise, date }: transactionDB =
      await this.transactionRepository.getById(input.id);
    const transaction = new Transaction({
      id,
      enterprise: new Enterprise({ id: enterprise }),
      date: new Date(date),
    });
    if (input.date) transaction.setDate(input.date);
    if (input.enterprise) {
      const enterpriseDB: enterpriseDB = await this.enterpriseRepository.get(
        input.enterprise
      );
      transaction.setEnterprise(new Enterprise({ id: enterpriseDB.id }));
    }
    await this.transactionRepository.save(transaction);
    return {
      id: transaction.getId(),
    };
  }
}
