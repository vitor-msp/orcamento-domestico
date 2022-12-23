import {
  ITransactionItemRepository,
  transactionItemDB,
} from "../../repositories/interfaces/ITransactionItemRepository";
import {
  ITransactionRepository,
  transactionDB,
} from "../../repositories/interfaces/ITransactionRepository";
import { IUseCase } from "../IUseCase";

export type getTransactionInput = {
  enterprise: string;
  date: Date;
};

export type getTransactionOutput = transactionDB & {
  items: transactionItemDB[];
};

export class GetTransaction implements IUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionItemRepository: ITransactionItemRepository
  ) {}

  async execute(input: getTransactionInput): Promise<getTransactionOutput> {
    const { id, enterprise, date } = await this.transactionRepository.get(
      input.enterprise,
      input.date
    );
    const transaction: getTransactionOutput = {
      id,
      enterprise,
      date,
      items: [],
    };
    const items = await this.transactionItemRepository.getByTransaction(
      transaction.id
    );
    transaction.items = items;
    return transaction;
  }
}
