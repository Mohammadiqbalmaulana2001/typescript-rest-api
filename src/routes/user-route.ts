import { Router } from "express";
import { UserLogin, UserRefresh, UserRegister } from "../controllers/user.controller";

export const UserRouter: Router = Router()

UserRouter.post('/register', UserRegister)
UserRouter.post('/login',UserLogin)
UserRouter.post('/refresh', UserRefresh)