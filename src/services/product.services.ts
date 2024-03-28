import { logger } from "../utils/logger";
import productModel from "../models/product.models";

export const getProductService = async () => {
    return await productModel.find().then((data) => {
        return data
    }).catch((err) => {
        logger.info("database not connected")
        logger.error(err)
    })
}