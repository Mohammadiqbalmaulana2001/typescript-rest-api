import { Router ,Request , Response , NextFunction} from "express";
import { logger } from "../utils/logger";
import { createProductValidation } from "../validation/product-validation";

export const ProductRouter: Router = Router();

ProductRouter.get('/', (req: Request , res: Response , next: NextFunction) => {
    logger.info("request /product")
    res.status(200).json({status : true , statusCode: 200 ,data: {name :"spatu", price: 10000}})
})

ProductRouter.post('/', (req: Request , res: Response , next: NextFunction) => {
    const {error , value} = createProductValidation(req.body)
    if (error) {
        logger.error("post product failed")
        res.status(400).json({status : false , statusCode: 400 ,message: error.message , data: {}})
    }
    logger.info("post product success")
    res.status(200).json({status : true , statusCode: 200 ,message: "create product success" , data: value})
})