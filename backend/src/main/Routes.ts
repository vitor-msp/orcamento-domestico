import { Router, Request, Response } from "express";
import {
  createBrandController,
  createCategoryController,
  createItemController,
  deleteBrandController,
  deleteCategoryController,
  deleteItemController,
  getAllBrandsController,
  getAllCategoriesController,
  getAllItemsController,
  updateBrandController,
  updateCategoryController,
  updateItemController,
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

export { router };
