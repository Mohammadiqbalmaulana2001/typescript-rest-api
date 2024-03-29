import { Router } from "express";
import { createProductController, deleteProductController, getProductController, updateProductController } from "../controllers/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.get('/', getProductController )
ProductRouter.get('/:id', getProductController )
ProductRouter.post('/', createProductController )
ProductRouter.put('/:id', updateProductController )
ProductRouter.delete('/:id', deleteProductController)