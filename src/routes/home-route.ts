import { Router ,Request , Response , NextFunction} from "express";
import { logger } from "../utils/logger";

export const HomeRouter: Router = Router();

HomeRouter.get('/', (req: Request , res: Response , next: NextFunction) => {
    logger.info("request /home")
    res.status(200).json("Hello World!")
})