import { NextFunction , Request, Response } from "express";
import { createUserValidation, loginUserValidation } from "../validation/user.validation";
import {v4 as uuidv4} from 'uuid'
import { logger } from "../utils/logger";
import { comparePassword, hashPassword } from "../utils/hashing";
import { createUserService, findUserByEmailService } from "../services/user.services";
import UserType from "../types/user.type";
import { signJWT } from "../utils/jwt";
import exp from "constants";
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

export const UserLogin = async (req: Request , res: Response , next: NextFunction) => {
    const {error , value} = loginUserValidation(req.body);
    const errors = [];

    if(error){
        errors.push(error.details[0].message);
    }

    try {
        const user : any = await findUserByEmailService(value.email);

        if(!user) {
            errors.push("User not found");
        }

        const isPasswordValid = await comparePassword(value.password , user.password);

        if(!isPasswordValid) {
            errors.push("Password not match");
        }

        if (errors.length > 0) {
            logger.error('ERR: user - login = ', errors);
            return res.status(400).json({ status: false, statusCode: 400, message: errors });
        }

        const token = signJWT({ ...user }, { expiresIn: "1d" });
        logger.info("User login success");
        return res.status(200).json({ status: true, statusCode: 200, message: "User login success", data: { token } });
    } 
    catch (error) {
        logger.error('ERR: user - loginn = ', error);
        return res.status(500).json({ status: false, statusCode: 500, message: 'Internal Server Error' });
    }
}
