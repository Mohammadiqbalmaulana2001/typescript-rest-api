import { Router } from "express";
import { createProductController, deleteProductController, getProductController, updateProductController } from "../controllers/product.controller";
import { requireAdmin} from "../middleware/auth";

export const ProductRouter: Router = Router();

ProductRouter.get('/', getProductController )
ProductRouter.get('/:id', getProductController )
ProductRouter.post('/',requireAdmin, createProductController )
ProductRouter.put('/:id',requireAdmin, updateProductController )
ProductRouter.delete('/:id', requireAdmin,deleteProductController)