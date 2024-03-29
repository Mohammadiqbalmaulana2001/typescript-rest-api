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

export const updateProductService = async (id: string, payload: ProductType) =>{
    const result = await productModel.findOneAndUpdate(
        {product_id: id},
        {$set: payload},
    )
    return result
} 

export const deleteProductService = async (id: string) => {
    const result = await productModel.findOneAndDelete({product_id: id})
    return result
}