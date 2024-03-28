import mongoose from "mongoose";
import CONFIG from "../config/environtment";
import { logger } from "./logger";

mongoose.connect(`${CONFIG.db}`).then(() => {
    logger.info("database connected")
}).catch((err) => {
    logger.error(err)
})