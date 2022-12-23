import { Client } from "pg";
import { TransactionItem } from "../../domain/TransactionItem";
import { ITransactionItemRepository } from "../interfaces/ITransactionItemRepository";

export class TransactionItemRepository implements ITransactionItemRepository {
  constructor(private readonly db: Client) {}

  async save(entity: TransactionItem): Promise<void> {
    const wasUpdated: boolean = await this.update(entity);
    if (wasUpdated) return;
    const wasInserted: boolean = await this.insert(entity);
    if (wasInserted) return;
    throw new Error("Error to save transaction item in the database.");
  }

  private async insert(entity: TransactionItem): Promise<boolean> {
    const text: string = `
      INSERT INTO transaction_item
      (id,  transaction,  item,  brand,  category,  quantity,  unitOfMeasurement,  totalValue)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const values: any[] = [
      entity.getId(),
      entity.getTransaction().getId(),
      entity.getItem().getId(),
      entity.getBrand().getId(),
      entity.getCategory().getId(),
      entity.getQuantity(),
      entity.getUnitOfMeasurement(),
      entity.getTotalValue(),
    ];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

  private async update(entity: TransactionItem): Promise<boolean> {
    const text: string = `
      UPDATE transaction_item SET
      item = $2, brand = $3, category = $4,
      quantity = $5, unitOfMeasurement = $6, totalValue = $7
      WHERE id = $1;`;
    const values: any[] = [
      entity.getId(),
      entity.getItem().getId(),
      entity.getBrand().getId(),
      entity.getCategory().getId(),
      entity.getQuantity(),
      entity.getUnitOfMeasurement(),
      entity.getTotalValue(),
    ];
    const res = await this.db.query(text, values);
    if (res.rowCount === 1) return true;
    return false;
  }

}
