import userModel from "../models/user.model";
import UserType  from "../types/user.type";

export const createUserService = async (payload: UserType) => {
    return await userModel.create(payload)
} 