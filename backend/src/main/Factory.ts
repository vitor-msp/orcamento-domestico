import { CreateItemController } from "../controllers/item/CreateItemController";
import { DB } from "../infra/database/DB";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { CreateItem } from "../use-cases/item/CreateItem";

let createItemController: CreateItemController;

(async () => {
  const dbClient = await DB.connect();
  const itemsRepository = new ItemsRepository(dbClient);

  const createItemUseCase = new CreateItem(itemsRepository);
  createItemController = new CreateItemController(createItemUseCase);
})();

export { createItemController };
