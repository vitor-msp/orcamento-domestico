import { Router, Request, Response } from "express";
import {
  createBrandController,
  createItemController,
  deleteBrandController,
  deleteItemController,
  getAllBrandsController,
  getAllItemsController,
  updateBrandController,
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

export { router };
