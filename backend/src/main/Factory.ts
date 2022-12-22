import { CreateItemController } from "../controllers/item/CreateItemController";
import { UpdateItemController } from "../controllers/item/UpdateItemController";
import { DB } from "../infra/database/DB";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { CreateItem } from "../use-cases/item/CreateItem";
import { UpdateItem } from "../use-cases/item/UpdateItem";

let createItemController: CreateItemController;
let updateItemController: UpdateItemController;

(async () => {
  const dbClient = await DB.connect();
  const itemsRepository = new ItemsRepository(dbClient);

  const createItemUseCase = new CreateItem(itemsRepository);
  createItemController = new CreateItemController(createItemUseCase);
  const updateItemUseCase = new UpdateItem(itemsRepository);
  updateItemController = new UpdateItemController(updateItemUseCase);
})();

export { createItemController, updateItemController };
