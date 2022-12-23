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
import { CreateTransactionItemController } from "../controllers/transaction-item/CreateTransactionItemController";
import { DeleteTransactionItemController } from "../controllers/transaction-item/DeleteTransactionItemController";
import { UpdateTransactionItemController } from "../controllers/transaction-item/UpdateTransactionItemController";
import { CreateTransactionController } from "../controllers/transaction/CreateTransactionController";
import { DeleteTransactionController } from "../controllers/transaction/DeleteTransactionController";
import { GetTransactionController } from "../controllers/transaction/GetTransactionController";
import { UpdateTransactionController } from "../controllers/transaction/UpdateTransactionController";
import { DB } from "../infra/database/DB";
import { BrandRepository } from "../repositories/implementations/BrandRepository";
import { CategoryRepository } from "../repositories/implementations/CategoryRepository";
import { EnterpriseRepository } from "../repositories/implementations/EnterpriseRepository";
import { ItemRepository } from "../repositories/implementations/ItemRepository";
import { TransactionItemRepository } from "../repositories/implementations/TransactionItemRepository";
import { TransactionRepository } from "../repositories/implementations/TransactionRepository";
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
import { CreateTransactionItem } from "../use-cases/transaction-item/CreateTransactionItem";
import { DeleteTransactionItem } from "../use-cases/transaction-item/DeleteTransactionItem";
import { UpdateTransactionItem } from "../use-cases/transaction-item/UpdateTransactionItem";
import { CreateTransaction } from "../use-cases/transaction/CreateTransaction";
import { DeleteTransaction } from "../use-cases/transaction/DeleteTransaction";
import { GetTransaction } from "../use-cases/transaction/GetTransaction";
import { UpdateTransaction } from "../use-cases/transaction/UpdateTransaction";
import { TransactionItemValidator } from "../validators/TransactionItemValidator";
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
let updateTransactionController: UpdateTransactionController;
let deleteTransactionController: DeleteTransactionController;
let getTransactionController: GetTransactionController;

let createTransactionItemController: CreateTransactionItemController;
let updateTransactionItemController: UpdateTransactionItemController;
let deleteTransactionItemController: DeleteTransactionItemController;

(async () => {
  const dbClient = await DB.connect();

  const itemRepository = new ItemRepository(dbClient);
  const createItemUseCase = new CreateItem(itemRepository);
  createItemController = new CreateItemController(createItemUseCase);
  const updateItemUseCase = new UpdateItem(itemRepository);
  updateItemController = new UpdateItemController(updateItemUseCase);
  const deleteItemuseCase = new DeleteItem(itemRepository);
  deleteItemController = new DeleteItemController(deleteItemuseCase);
  const getAllItemsUseCase = new GetAllItems(itemRepository);
  getAllItemsController = new GetAllItemsController(getAllItemsUseCase);

  const brandRepository = new BrandRepository(dbClient);
  const createBrandUseCase = new CreateBrand(brandRepository);
  createBrandController = new CreateBrandController(createBrandUseCase);
  const updateBrandUseCase = new UpdateBrand(brandRepository);
  updateBrandController = new UpdateBrandController(updateBrandUseCase);
  const deleteBranduseCase = new DeleteBrand(brandRepository);
  deleteBrandController = new DeleteBrandController(deleteBranduseCase);
  const getAllBrandsUseCase = new GetAllBrands(brandRepository);
  getAllBrandsController = new GetAllBrandsController(getAllBrandsUseCase);

  const categoryRepository = new CategoryRepository(dbClient);
  const createCategoryUseCase = new CreateCategory(categoryRepository);
  createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );
  const updateCategoryUseCase = new UpdateCategory(categoryRepository);
  updateCategoryController = new UpdateCategoryController(
    updateCategoryUseCase
  );
  const deleteCategoryuseCase = new DeleteCategory(categoryRepository);
  deleteCategoryController = new DeleteCategoryController(
    deleteCategoryuseCase
  );
  const getAllCategorysUseCase = new GetAllCategories(categoryRepository);
  getAllCategoriesController = new GetAllCategoriesController(
    getAllCategorysUseCase
  );

  const enterpriseRepository = new EnterpriseRepository(dbClient);
  const createEnterpriseUseCase = new CreateEnterprise(enterpriseRepository);
  createEnterpriseController = new CreateEnterpriseController(
    createEnterpriseUseCase
  );
  const updateEnterpriseUseCase = new UpdateEnterprise(enterpriseRepository);
  updateEnterpriseController = new UpdateEnterpriseController(
    updateEnterpriseUseCase
  );
  const deleteEnterpriseuseCase = new DeleteEnterprise(enterpriseRepository);
  deleteEnterpriseController = new DeleteEnterpriseController(
    deleteEnterpriseuseCase
  );
  const getAllEnterprisesUseCase = new GetAllEnterprises(enterpriseRepository);
  getAllEnterprisesController = new GetAllEnterprisesController(
    getAllEnterprisesUseCase
  );

  const transactionRepository = new TransactionRepository(dbClient);
  const createTransactionUseCase = new CreateTransaction(
    transactionRepository,
    enterpriseRepository
  );
  const transactionValidator = new TransactionValidator();
  createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
    transactionValidator
  );
  const updateTransactionUseCase = new UpdateTransaction(
    transactionRepository,
    enterpriseRepository
  );
  updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase,
    transactionValidator
  );

  const transactionItemRepository = new TransactionItemRepository(dbClient);
  const createTransactionItemUseCase = new CreateTransactionItem(
    transactionItemRepository,
    transactionRepository,
    itemRepository,
    brandRepository,
    categoryRepository
  );
  const transactionItemValidator = new TransactionItemValidator();
  createTransactionItemController = new CreateTransactionItemController(
    createTransactionItemUseCase,
    transactionItemValidator
  );
  const updateTransactionItemUseCase = new UpdateTransactionItem(
    transactionItemRepository,
    itemRepository,
    brandRepository,
    categoryRepository
  );
  updateTransactionItemController = new UpdateTransactionItemController(
    updateTransactionItemUseCase,
    transactionItemValidator
  );
  const deleteTransactionItemUseCase = new DeleteTransactionItem(
    transactionItemRepository
  );
  deleteTransactionItemController = new DeleteTransactionItemController(
    deleteTransactionItemUseCase
  );

  const deleteTransactionUseCase = new DeleteTransaction(
    transactionRepository,
    transactionItemRepository
  );
  deleteTransactionController = new DeleteTransactionController(
    deleteTransactionUseCase
  );
  const getTransactionUseCase = new GetTransaction(
    transactionRepository,
    transactionItemRepository
  );
  getTransactionController = new GetTransactionController(
    getTransactionUseCase,
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
  updateTransactionController,
  deleteTransactionController,
  getTransactionController,
  createTransactionItemController,
  updateTransactionItemController,
  deleteTransactionItemController,
};
