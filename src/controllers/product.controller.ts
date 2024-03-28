import { NextFunction , Request , Response } from "express"
import { logger } from "../utils/logger"
import { createProductValidation } from "../validation/product-validation"
import { getProductService } from "../services/product.services"

interface ProductType {
    product_id: String
    name: String
    price: Number
    size: String
}
export const getProductController = async (req: Request , res: Response , next: NextFunction) => {
    const products:any = await getProductService()

    const {name} = req.params

    if (name) {
        const filterProduct = products.filter((product : ProductType) => {
            if (product.name === name) {
            return product
            }
        })  
        if (filterProduct.length === 0) {
            logger.info('Data not found')
            return res.status(404).send({ status: false, statusCode: 404, data: {} })
        }
        logger.info('Success get product data')
        return res.status(200).send({ status: true, statusCode: 200, data: filterProduct[0] })
        }
    logger.info("request /product")
    res.status(200).json({status : true , statusCode: 200 ,data: products})
}

export const createProductController = (req: Request , res: Response , next: NextFunction) => {
    const {error , value} = createProductValidation(req.body)
    if (error) {
        logger.error("post product failed")
        res.status(400).json({status : false , statusCode: 400 ,message: error.message , data: {}})
    }
    logger.info("post product success")
    res.status(200).json({status : true , statusCode: 200 ,message: "create product success" , data: value})
}