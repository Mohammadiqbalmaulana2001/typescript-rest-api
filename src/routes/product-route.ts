import { Router } from "express";
import { createProductController, getProductController } from "../controllers/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.get('/', getProductController )
ProductRouter.get('/:id', getProductController )
ProductRouter.post('/', createProductController )