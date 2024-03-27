import { Router ,Request , Response , NextFunction} from "express";
import { logger } from "../utils/logger";

export const ProductRouter: Router = Router();

ProductRouter.get('/', (req: Request , res: Response , next: NextFunction) => {
    logger.info("request /product")
    res.status(200).json({status : true , statusCode: 200 ,data: {name :"spatu", price: 10000}})
})

ProductRouter.post('/', (req: Request , res: Response , next: NextFunction) => {
    logger.info("post product success")
    res.status(200).json({status : true , statusCode: 200 ,data: req.body})
})