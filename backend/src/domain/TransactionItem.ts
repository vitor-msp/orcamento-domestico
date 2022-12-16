import { v4 as uuidv4 } from "uuid";
import { Brand } from "./Brand";
import { Category } from "./Category";
import { Item } from "./Item";
import { Transaction } from "./Transaction";

export class TransactionItem {
  private id: string;
  private transaction: Transaction;
  private item: Item;
  private brand: Brand;
  private category: Category;
  private quantity: number;
  private unitOfMeasurement: string;
  private totalValue: number;

  constructor(props: {
    id?: string;
    transaction: Transaction;
    item: Item;
    brand: Brand;
    category: Category;
    quantity: number;
    unitOfMeasurement: string;
    totalValue: number;
  }) {
    this.id = props.id ?? uuidv4();
    this.transaction = props.transaction;
    this.item = props.item;
    this.brand = props.brand;
    this.category = props.category;
    this.quantity = props.quantity;
    this.unitOfMeasurement = props.unitOfMeasurement;
    this.totalValue = props.totalValue;
  }

  public setItem(newItem: Item): void {
    this.item = newItem;
  }

  public setBrand(newBrand: Brand): void {
    this.brand = newBrand;
  }

  public setCategory(newCategory: Category): void {
    this.category = newCategory;
  }

  public setQuantity(newQuantity: number): void {
    this.quantity = newQuantity;
  }

  public setUnitOfMeasurement(newUnitOfMeasurement: string): void {
    this.unitOfMeasurement = newUnitOfMeasurement;
  }

  public setTotalValue(newTotalValue: number): void {
    this.totalValue = newTotalValue;
  }

  public getItem(): Item {
    return this.item;
  }

  public getBrand(): Brand {
    return this.brand;
  }

  public getCategory(): Category {
    return this.category;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getUnitOfMeasurement(): string {
    return this.unitOfMeasurement;
  }

  public getTotalValue(): number {
    return this.totalValue;
  }

  public getTransaction(): Transaction {
    return this.transaction;
  }

  public getId(): string {
    return this.id;
  }
}
