import { Router, Request, Response } from "express";
import {
  createItemController,
  deleteItemController,
  getAllItemsController,
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

export { router };
