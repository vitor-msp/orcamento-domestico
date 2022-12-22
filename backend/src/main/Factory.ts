import { CreateBrandController } from "../controllers/brand/CreateBrandController";
import { DeleteBrandController } from "../controllers/brand/DeleteBrandController";
import { GetAllBrandsController } from "../controllers/brand/GetAllBrandsController";
import { UpdateBrandController } from "../controllers/brand/UpdateBrandController";
import { CreateItemController } from "../controllers/item/CreateItemController";
import { DeleteItemController } from "../controllers/item/DeleteItemController";
import { GetAllItemsController } from "../controllers/item/GetAllItemsController";
import { UpdateItemController } from "../controllers/item/UpdateItemController";
import { DB } from "../infra/database/DB";
import { BrandsRepository } from "../repositories/BrandsRepository";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { CreateBrand } from "../use-cases/brand/CreateBrand";
import { DeleteBrand } from "../use-cases/brand/DeleteBrand";
import { GetAllBrands } from "../use-cases/brand/GetAllBrands";
import { UpdateBrand } from "../use-cases/brand/UpdateBrand";
import { CreateItem } from "../use-cases/item/CreateItem";
import { DeleteItem } from "../use-cases/item/DeleteItem";
import { GetAllItems } from "../use-cases/item/GetAllItems";
import { UpdateItem } from "../use-cases/item/UpdateItem";

let createItemController: CreateItemController;
let updateItemController: UpdateItemController;
let deleteItemController: DeleteItemController;
let getAllItemsController: GetAllItemsController;

let createBrandController: CreateBrandController;
let updateBrandController: UpdateBrandController;
let deleteBrandController: DeleteBrandController;
let getAllBrandsController: GetAllBrandsController;

(async () => {
  const dbClient = await DB.connect();
  
  const itemsRepository = new ItemsRepository(dbClient);
  const createItemUseCase = new CreateItem(itemsRepository);
  createItemController = new CreateItemController(createItemUseCase);
  const updateItemUseCase = new UpdateItem(itemsRepository);
  updateItemController = new UpdateItemController(updateItemUseCase);
  const deleteItemuseCase = new DeleteItem(itemsRepository);
  deleteItemController = new DeleteItemController(deleteItemuseCase);
  const getAllItemsUseCase = new GetAllItems(itemsRepository);
  getAllItemsController = new GetAllItemsController(getAllItemsUseCase);

  const brandsRepository = new BrandsRepository(dbClient);
  const createBrandUseCase = new CreateBrand(brandsRepository);
  createBrandController = new CreateBrandController(createBrandUseCase);
  const updateBrandUseCase = new UpdateBrand(brandsRepository);
  updateBrandController = new UpdateBrandController(updateBrandUseCase);
  const deleteBranduseCase = new DeleteBrand(brandsRepository);
  deleteBrandController = new DeleteBrandController(deleteBranduseCase);
  const getAllBrandsUseCase = new GetAllBrands(brandsRepository);
  getAllBrandsController = new GetAllBrandsController(getAllBrandsUseCase);
})();

export {
  createItemController,
  updateItemController,
  deleteItemController,
  getAllItemsController,
  createBrandController,
  updateBrandController,
  deleteBrandController,
  getAllBrandsController,
};
