import { Router } from "express";
import { UserRegister } from "../controllers/user.controller";

export const UserRouter: Router = Router()

UserRouter.post('/register', UserRegister)