import { Router, Request, Response } from "express";
import { createItemController, updateItemController } from "./Factory";

const router = Router();

router.post("/items", (req: Request, res: Response) => {
  createItemController.handle(req, res);
});
router.put("/items/:id", (req: Request, res: Response) => {
  updateItemController.handle(req, res);
});

export { router };
