import { CreateItemController } from "../controllers/item/CreateItemController";
import { DeleteItemController } from "../controllers/item/DeleteItemController";
import { GetAllItemsController } from "../controllers/item/GetAllItemsController";
import { UpdateItemController } from "../controllers/item/UpdateItemController";
import { DB } from "../infra/database/DB";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { CreateItem } from "../use-cases/item/CreateItem";
import { DeleteItem } from "../use-cases/item/DeleteItem";
import { GetAllItems } from "../use-cases/item/GetAllItems";
import { UpdateItem } from "../use-cases/item/UpdateItem";

let createItemController: CreateItemController;
let updateItemController: UpdateItemController;
let deleteItemController: DeleteItemController;
let getAllItemsController: GetAllItemsController;

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
})();

export {
  createItemController,
  updateItemController,
  deleteItemController,
  getAllItemsController,
};
