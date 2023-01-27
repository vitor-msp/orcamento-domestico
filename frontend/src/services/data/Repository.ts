import { Item } from "../../domain/Item";
import { IItemApi } from "../api/IItemApi";

export type RepositoryConstructor = {
  enterpriseApi: IItemApi;
  itemApi: IItemApi;
  brandApi: IItemApi;
  categoryApi: IItemApi;
};

export class Repository {
  private readonly enterpriseApi: IItemApi;
  private readonly itemApi: IItemApi;
  private readonly brandApi: IItemApi;
  private readonly categoryApi: IItemApi;
  private enterprises: Item[];
  private items: Item[];
  private brands: Item[];
  private categories: Item[];

  constructor(input: RepositoryConstructor) {
    this.enterpriseApi = input.enterpriseApi;
    this.itemApi = input.itemApi;
    this.brandApi = input.brandApi;
    this.categoryApi = input.categoryApi;
    this.enterprises = [];
    this.items = [];
    this.brands = [];
    this.categories = [];
  }

  public async getAsync(itemName: string): Promise<Item[]> {
    switch (itemName) {
      case "enterprise":
        return await this.getEnterprisesAsync();
      case "item":
        return await this.getItemsAsync();
      case "brand":
        return await this.getBrandsAsync();
      case "category":
        return await this.getCategoriesAsync();
      default:
        return [];
    }
  }

  private async getEnterprisesAsync(): Promise<Item[]> {
    if (this.enterprises.length === 0) await this.loadEnterprises();
    return this.enterprises;
  }

  private async getItemsAsync(): Promise<Item[]> {
    if (this.items.length === 0) await this.loadItems();
    return this.items;
  }

  private async getBrandsAsync(): Promise<Item[]> {
    if (this.brands.length === 0) await this.loadBrands();
    return this.brands;
  }

  private async getCategoriesAsync(): Promise<Item[]> {
    if (this.categories.length === 0) await this.loadCategories();
    return this.categories;
  }

  public get(itemName: string): Item[] {
    switch (itemName) {
      case "enterprise":
        return this.enterprises;
      case "item":
        return this.items;
      case "brand":
        return this.brands;
      case "category":
        return this.categories;
      default:
        return [];
    }
  }

  private async loadEnterprises(): Promise<void> {
    const enterprises = await this.enterpriseApi.getAll();
    if (enterprises === null) {
      alert("Erro ao carregar as empresas!");
      return;
    }
    this.enterprises = enterprises;
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
