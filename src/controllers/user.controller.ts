import { NextFunction , Request, Response } from "express";
import { createUserValidation } from "../validation/user.validation";
import {v4 as uuidv4} from 'uuid'
import { logger } from "../utils/logger";
import { hashPassword } from "../utils/hashing";
import { createUserService } from "../services/user.services";
export const UserRegister = async (req: Request , res: Response , next: NextFunction) => {
    req.body.user_id = uuidv4()
    const {error , value} = createUserValidation(req.body)

    if(error){
        logger.error('ERR: user - create = ', error.details[0].message)
        res.status(400).json({status : false , statusCode: 400 ,message: error.details[0].message})
    }

    try {
        const hashing = `${await hashPassword(value.password)}`
        const newUser = await createUserService({...value , password: hashing})
        logger.info("create user success")
        res.status(200).json({status : true , statusCode: 200 ,message: "create user success" , data: newUser})
    } catch (error) {
        logger.error('ERR: user - create = ', error)
        res.status(400).json({status : false , statusCode: 400 ,message: error})
    }
}