import { Brand } from "../../domain/Brand";
import { Category } from "../../domain/Category";
import { Item } from "../../domain/Item";
import { Transaction } from "../../domain/Transaction";
import { TransactionItem } from "../../domain/TransactionItem";
import { IBrandRepository } from "../../repositories/interfaces/IBrandRepository";
import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";
import { IItemRepository } from "../../repositories/interfaces/IItemRepository";
import { ITransactionItemRepository } from "../../repositories/interfaces/ITransactionItemRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { IUseCase } from "../IUseCase";

export type createTransactionItemInput = {
  transaction: string;
  item: string;
  brand: string;
  category: string;
  quantity: number;
  unitOfMeasurement: string;
  totalValue: number;
};

export type createTransactionItemOutput = {
  id: string;
};

export class CreateTransactionItem implements IUseCase {
  constructor(
    private readonly transactionItemRepository: ITransactionItemRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly itemRepository: IItemRepository,
    private readonly brandRepository: IBrandRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(
    input: createTransactionItemInput
  ): Promise<createTransactionItemOutput> {
    const transactionDB = await this.transactionRepository.get(
      input.transaction
    );
    const transaction = new Transaction({ id: transactionDB.id });
    const itemDB = await this.itemRepository.get(input.item);
    const item = new Item({ id: itemDB.id });
    const brandDB = await this.brandRepository.get(input.brand);
    const brand = new Brand({ id: brandDB.id });
    const categoryDB = await this.categoryRepository.get(input.category);
    const category = new Category({ id: categoryDB.id });
    const { quantity, totalValue, unitOfMeasurement } = input;
    const transactionItem = new TransactionItem({
      transaction,
      item,
      brand,
      category,
      quantity,
      totalValue,
      unitOfMeasurement,
    });
    await this.transactionItemRepository.save(transactionItem);
    return {
      id: transactionItem.getId(),
    };
  }
}
