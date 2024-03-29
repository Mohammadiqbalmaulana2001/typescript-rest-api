import { logger } from "../utils/logger";
import productModel from "../models/product.models";
import  ProductType  from "../types/product.type";

export const getProductService = async () => {
    return await productModel.find().then((data) => {
        return data
    }).catch((err) => {
        logger.info("database not connected")
        logger.error(err)
    })
}

export const  getProductByIdService = async (id: string) => {
    return await productModel.findOne({product_id: id})
}
export const createProductService = async (payload: ProductType) => {
    return await productModel.create(payload)
}
