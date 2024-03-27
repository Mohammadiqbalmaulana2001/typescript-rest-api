import { Application, Router } from "express";
import { HomeRouter } from "./home";
import { ProductRouter } from "./product";

const _routes: Array<[string , Router]> = [
    ['/home' , HomeRouter],
    ['/product' , ProductRouter]
]

export const Routes = (app:Application) => {
    _routes.forEach((route) => {
        const [url, Router] = route
        app.use(url , Router)
    })
}