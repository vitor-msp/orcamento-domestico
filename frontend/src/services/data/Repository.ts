import { Item } from "../../domain/Item";
import { IItemApi } from "../api/IItemApi";

export class Repository {
  private items: Item[];
  private brands: Item[];
  private categories: Item[];

  constructor(
    private readonly itemApi: IItemApi,
    private readonly brandApi: IItemApi,
    private readonly categoryApi: IItemApi
  ) {
    this.items = [];
    this.brands = [];
    this.categories = [];
  }

  public async get(property: string): Promise<Item[]> {
    switch (property) {
      case "item":
        return await this.getItems();
      case "brand":
        return await this.getBrands();
      case "category":
        return await this.getCategories();
      default:
        return [];
    }
  }

  private async getItems(): Promise<Item[]> {
    if (this.items.length === 0) await this.loadItems();
    return this.items;
  }

  private async getBrands(): Promise<Item[]> {
    if (this.brands.length === 0) await this.loadBrands();
    return this.brands;
  }

  private async getCategories(): Promise<Item[]> {
    if (this.categories.length === 0) await this.loadCategories();
    return this.categories;
  }

  private async loadItems(): Promise<void> {
    const items = await this.itemApi.getAll();
    if (items === null) {
      alert("Erro ao carregar os itens!");
      return;
    }
    this.items = items;
  }

  private async loadBrands(): Promise<void> {
    const brands = await this.brandApi.getAll();
    if (brands === null) {
      alert("Erro ao carregar as marcas!");
      return;
    }
    this.brands = brands;
  }

  private async loadCategories(): Promise<void> {
    const categories = await this.categoryApi.getAll();
    if (categories === null) {
      alert("Erro ao carregar as categorias!");
      return;
    }
    this.categories = categories;
  }
}
