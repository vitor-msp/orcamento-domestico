import { CreateBrandController } from "../controllers/brand/CreateBrandController";
import { DeleteBrandController } from "../controllers/brand/DeleteBrandController";
import { GetAllBrandsController } from "../controllers/brand/GetAllBrandsController";
import { UpdateBrandController } from "../controllers/brand/UpdateBrandController";
import { CreateCategoryController } from "../controllers/category/CreateCategoryController";
import { DeleteCategoryController } from "../controllers/category/DeleteCategoryController";
import { GetAllCategoriesController } from "../controllers/category/GetAllCategoriesController";
import { UpdateCategoryController } from "../controllers/category/UpdateCategoryController";
import { CreateEnterpriseController } from "../controllers/enterprise/CreateEnterpriseController";
import { DeleteEnterpriseController } from "../controllers/enterprise/DeleteEnterpriseController";
import { GetAllEnterprisesController } from "../controllers/enterprise/GetAllEnterprisesController";
import { UpdateEnterpriseController } from "../controllers/enterprise/UpdateEnterpriseController";
import { CreateItemController } from "../controllers/item/CreateItemController";
import { DeleteItemController } from "../controllers/item/DeleteItemController";
import { GetAllItemsController } from "../controllers/item/GetAllItemsController";
import { UpdateItemController } from "../controllers/item/UpdateItemController";
import { CreateTransactionController } from "../controllers/transaction/CreateTransactionController";
import { DB } from "../infra/database/DB";
import { BrandsRepository } from "../repositories/BrandsRepository";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { EnterprisesRepository } from "../repositories/EnterprisesRepository";
import { ItemsRepository } from "../repositories/ItemsRepository";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { CreateBrand } from "../use-cases/brand/CreateBrand";
import { DeleteBrand } from "../use-cases/brand/DeleteBrand";
import { GetAllBrands } from "../use-cases/brand/GetAllBrands";
import { UpdateBrand } from "../use-cases/brand/UpdateBrand";
import { CreateCategory } from "../use-cases/category/CreateCategory";
import { DeleteCategory } from "../use-cases/category/DeleteCategory";
import { GetAllCategories } from "../use-cases/category/GetAllCategories";
import { UpdateCategory } from "../use-cases/category/UpdateCategory";
import { CreateEnterprise } from "../use-cases/enterprise/CreateEnterprise";
import { DeleteEnterprise } from "../use-cases/enterprise/DeleteEnterprise";
import { GetAllEnterprises } from "../use-cases/enterprise/GetAllEnterprises";
import { UpdateEnterprise } from "../use-cases/enterprise/UpdateEnterprise";
import { CreateItem } from "../use-cases/item/CreateItem";
import { DeleteItem } from "../use-cases/item/DeleteItem";
import { GetAllItems } from "../use-cases/item/GetAllItems";
import { UpdateItem } from "../use-cases/item/UpdateItem";
import { CreateTransaction } from "../use-cases/transaction/CreateTransaction";
import { TransactionValidator } from "../validators/TransactionValidator";

let createItemController: CreateItemController;
let updateItemController: UpdateItemController;
let deleteItemController: DeleteItemController;
let getAllItemsController: GetAllItemsController;

let createBrandController: CreateBrandController;
let updateBrandController: UpdateBrandController;
let deleteBrandController: DeleteBrandController;
let getAllBrandsController: GetAllBrandsController;

let createCategoryController: CreateCategoryController;
let updateCategoryController: UpdateCategoryController;
let deleteCategoryController: DeleteCategoryController;
let getAllCategoriesController: GetAllCategoriesController;

let createEnterpriseController: CreateEnterpriseController;
let updateEnterpriseController: UpdateEnterpriseController;
let deleteEnterpriseController: DeleteEnterpriseController;
let getAllEnterprisesController: GetAllEnterprisesController;

let createTransactionController: CreateTransactionController;

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

  const categoriesRepository = new CategoriesRepository(dbClient);
  const createCategoryUseCase = new CreateCategory(categoriesRepository);
  createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );
  const updateCategoryUseCase = new UpdateCategory(categoriesRepository);
  updateCategoryController = new UpdateCategoryController(
    updateCategoryUseCase
  );
  const deleteCategoryuseCase = new DeleteCategory(categoriesRepository);
  deleteCategoryController = new DeleteCategoryController(
    deleteCategoryuseCase
  );
  const getAllCategorysUseCase = new GetAllCategories(categoriesRepository);
  getAllCategoriesController = new GetAllCategoriesController(
    getAllCategorysUseCase
  );

  const enterprisesRepository = new EnterprisesRepository(dbClient);
  const createEnterpriseUseCase = new CreateEnterprise(enterprisesRepository);
  createEnterpriseController = new CreateEnterpriseController(
    createEnterpriseUseCase
  );
  const updateEnterpriseUseCase = new UpdateEnterprise(enterprisesRepository);
  updateEnterpriseController = new UpdateEnterpriseController(
    updateEnterpriseUseCase
  );
  const deleteEnterpriseuseCase = new DeleteEnterprise(enterprisesRepository);
  deleteEnterpriseController = new DeleteEnterpriseController(
    deleteEnterpriseuseCase
  );
  const getAllEnterprisesUseCase = new GetAllEnterprises(enterprisesRepository);
  getAllEnterprisesController = new GetAllEnterprisesController(
    getAllEnterprisesUseCase
  );

  const transactionsRepository = new TransactionsRepository(dbClient);
  const createTransactionUseCase = new CreateTransaction(
    transactionsRepository,
    enterprisesRepository
  );
  const transactionValidator = new TransactionValidator();
  createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
    transactionValidator
  );
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
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  createEnterpriseController,
  updateEnterpriseController,
  deleteEnterpriseController,
  getAllEnterprisesController,
  createTransactionController,
};
