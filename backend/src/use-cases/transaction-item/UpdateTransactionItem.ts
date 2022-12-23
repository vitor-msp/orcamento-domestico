import { Brand } from "../../domain/Brand";
import { Category } from "../../domain/Category";
import { Item } from "../../domain/Item";
import { Transaction } from "../../domain/Transaction";
import { TransactionItem } from "../../domain/TransactionItem";
import { IBrandRepository } from "../../repositories/interfaces/IBrandRepository";
import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";
import { IItemRepository } from "../../repositories/interfaces/IItemRepository";
import { ITransactionItemRepository } from "../../repositories/interfaces/ITransactionItemRepository";
import { IUseCase } from "../IUseCase";

export type updateTransactionItemInput = {
  id: string;
  item?: string;
  brand?: string;
  category?: string;
  quantity?: number;
  unitOfMeasurement?: string;
  totalValue?: number;
};

export type updateTransactionItemOutput = {
  id: string;
};

export class UpdateTransactionItem implements IUseCase {
  constructor(
    private readonly transactionItemRepository: ITransactionItemRepository,
    private readonly itemRepository: IItemRepository,
    private readonly brandRepository: IBrandRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(
    input: updateTransactionItemInput
  ): Promise<updateTransactionItemOutput> {
    const transactionItemDB = await this.transactionItemRepository.get(
      input.id
    );
    const transactionItem = new TransactionItem({
      id: transactionItemDB.id,
      transaction: new Transaction({ id: transactionItemDB.transaction }),
      brand: new Brand({ id: transactionItemDB.brand }),
      category: new Category({ id: transactionItemDB.category }),
      item: new Item({ id: transactionItemDB.item }),
      quantity: transactionItemDB.quantity,
      totalValue: transactionItemDB.totalValue,
      unitOfMeasurement: transactionItemDB.unitOfMeasurement,
    });
    if (input.item) {
      const itemDB = await this.itemRepository.get(input.item);
      transactionItem.setItem(new Item({ id: itemDB.id }));
    }
    if (input.brand) {
      const brandDB = await this.brandRepository.get(input.brand);
      transactionItem.setBrand(new Brand({ id: brandDB.id }));
    }
    if (input.category) {
      const categoryDB = await this.categoryRepository.get(input.category);
      transactionItem.setCategory(new Category({ id: categoryDB.id }));
    }
    if (input.quantity) transactionItem.setQuantity(input.quantity);
    if (input.totalValue) transactionItem.setTotalValue(input.totalValue);
    if (input.unitOfMeasurement)
      transactionItem.setUnitOfMeasurement(input.unitOfMeasurement);
    await this.transactionItemRepository.save(transactionItem);
    return {
      id: transactionItem.getId(),
    };
  }
}
