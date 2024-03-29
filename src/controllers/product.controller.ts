import { NextFunction , Request , Response } from "express"
import { logger } from "../utils/logger"
import { createProductValidation, updateProductValidation } from "../validation/product-validation"
import { createProductService, deleteProductService, getProductByIdService, getProductService, updateProductService } from "../services/product.services"
import {v4 as uuidv4} from 'uuid'

export const getProductController = async (req: Request , res: Response , next: NextFunction) => {
    const {id} = req.params

    if (id) {
        const product = await getProductByIdService(id)
        if (product) {
            logger.info('Success get product data by id')
            return res.status(200).send({ status: true, statusCode: 200, data: product })
        }else {
            logger.info('Product not found')
            return res.status(400).send({ status: false, statusCode: 400, message: 'Product not found' })
        }
    }else {
        const products = await getProductService()
        logger.info('Success get product data')
        return res.status(200).send({ status: true, statusCode: 200, data: products })
    }
}

export const createProductController = async (req: Request , res: Response , next: NextFunction) => {
    req.body.product_id = uuidv4()
    const {error , value} = createProductValidation(req.body)
    if (error) {
        logger.error('ERR: product - create = ', error.details[0].message)
        res.status(400).json({status : false , statusCode: 400 ,message: error.details[0].message})
    }

    try {
        await createProductService(value)
        logger.info("create product success")
        res.status(200).json({status : true , statusCode: 200 ,message: "create product success" , data: value})
    } catch (error) {
        logger.error('ERR: product - create = ', error)
        res.status(400).json({status : false , statusCode: 400 ,message: error})
    }
}

export const updateProductController = async (req: Request , res: Response , next: NextFunction) => {
    const {id} = req.params
    const {error , value} = updateProductValidation(req.body)

    if(error) {
        logger.error('ERR: product - update = ', error.details[0].message)
        res.status(400).json({status : false , statusCode: 400 ,message: error.details[0].message})
    }

    try {
        const result = await updateProductService(id , value)
        if(result) {
            logger.info("update product success")
            res.status(200).json({status : true , statusCode: 200 ,message: "update product success" , data: value})
        }else {
            logger.info("product not found")
            res.status(400).json({status : false , statusCode: 400 ,message: "product not found"})
        }
    } catch (error) {
        logger.error('ERR: product - update = ', error)
        res.status(400).json({status : false , statusCode: 400 ,message: error})
    }
}

export const deleteProductController = async (req: Request , res: Response , next: NextFunction) => {
    const {id} = req.params
    try {
        const result = await deleteProductService(id)
        if(result) {
            logger.info("delete product success")
            res.status(200).json({status : true , statusCode: 200 ,message: "delete product success"})
        }else {
            logger.info("product not found")
            res.status(400).json({status : false , statusCode: 400 ,message: "product not found"})
        }
    } catch (error) {
        logger.error('ERR: product - delete = ', error)
    }
}