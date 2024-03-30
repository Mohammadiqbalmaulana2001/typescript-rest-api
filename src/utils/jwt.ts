import jwt from "jsonwebtoken"
import CONFIG  from "../config/environtment"
import { valid } from "joi"

export const signJWT = (payload : Object , options?: jwt.SignOptions) => {
    return jwt.sign(payload , CONFIG.secret_key ,{algorithm: "HS256" , ...options})
}

export const verifyJWT = (token : string) => {
    try {
        const payload = jwt.verify(token , CONFIG.secret_key)
        return {
            valid: true,
            expired: false,
            decoded: payload
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }
}