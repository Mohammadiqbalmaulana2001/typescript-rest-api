import { Application, Router } from "express";
import { HomeRouter } from "./home-route";
import { ProductRouter } from "./product-route";
import { UserRouter } from "./user-route";

const _routes: Array<[string , Router]> = [
    ['/home' , HomeRouter],
    ['/product' , ProductRouter],
    ['/auth' , UserRouter]
]

export const Routes = (app:Application) => {
    _routes.forEach((route) => {
        const [url, Router] = route
        app.use(url , Router)
    })
}