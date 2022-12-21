import { Router, Request, Response } from "express";
import { createItemController } from "./Factory";

const router = Router();

router.post("/items", (req: Request, res: Response) => {
  createItemController.handle(req, res);
});

export { router };
