import { Router, Request, Response } from "express";
import {
  createBrandController,
  createCategoryController,
  createEnterpriseController,
  createItemController,
  createTransactionController,
  createTransactionItemController,
  deleteBrandController,
  deleteCategoryController,
  deleteEnterpriseController,
  deleteItemController,
  deleteTransactionController,
  deleteTransactionItemController,
  getAllBrandsController,
  getAllCategoriesController,
  getAllEnterprisesController,
  getAllItemsController,
  getTransactionController,
  updateBrandController,
  updateCategoryController,
  updateEnterpriseController,
  updateItemController,
  updateTransactionController,
  updateTransactionItemController,
} from "./Factory";

const router = Router();

router.post("/items", (req: Request, res: Response) => {
  createItemController.handle(req, res);
});
router.put("/items/:id", (req: Request, res: Response) => {
  updateItemController.handle(req, res);
});
router.delete("/items/:id", (req: Request, res: Response) => {
  deleteItemController.handle(req, res);
});
router.get("/items", (req: Request, res: Response) => {
  getAllItemsController.handle(req, res);
});

router.post("/brands", (req: Request, res: Response) => {
  createBrandController.handle(req, res);
});
router.put("/brands/:id", (req: Request, res: Response) => {
  updateBrandController.handle(req, res);
});
router.delete("/brands/:id", (req: Request, res: Response) => {
  deleteBrandController.handle(req, res);
});
router.get("/brands", (req: Request, res: Response) => {
  getAllBrandsController.handle(req, res);
});

router.post("/categories", (req: Request, res: Response) => {
  createCategoryController.handle(req, res);
});
router.put("/categories/:id", (req: Request, res: Response) => {
  updateCategoryController.handle(req, res);
});
router.delete("/categories/:id", (req: Request, res: Response) => {
  deleteCategoryController.handle(req, res);
});
router.get("/categories", (req: Request, res: Response) => {
  getAllCategoriesController.handle(req, res);
});

router.post("/enterprises", (req: Request, res: Response) => {
  createEnterpriseController.handle(req, res);
});
router.put("/enterprises/:id", (req: Request, res: Response) => {
  updateEnterpriseController.handle(req, res);
});
router.delete("/enterprises/:id", (req: Request, res: Response) => {
  deleteEnterpriseController.handle(req, res);
});
router.get("/enterprises", (req: Request, res: Response) => {
  getAllEnterprisesController.handle(req, res);
});

router.post("/transactions", (req: Request, res: Response) => {
  createTransactionController.handle(req, res);
});
router.put("/transactions/:id", (req: Request, res: Response) => {
  updateTransactionController.handle(req, res);
});
router.delete("/transactions/:id", (req: Request, res: Response) => {
  deleteTransactionController.handle(req, res);
});
router.get("/transactions/:id", (req: Request, res: Response) => {
  getTransactionController.handle(req, res);
});

router.post("/transaction-items", (req: Request, res: Response) => {
  createTransactionItemController.handle(req, res);
});
router.put("/transaction-items/:id", (req: Request, res: Response) => {
  updateTransactionItemController.handle(req, res);
});
router.delete("/transaction-items/:id", (req: Request, res: Response) => {
  deleteTransactionItemController.handle(req, res);
});

export { router };
