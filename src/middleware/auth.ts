import { NextFunction , Request , Response} from "express";

export const requireUser = (req: Request , res: Response , next: NextFunction) => {
    const user = res.locals.user

    if(!user) {
        return res.sendStatus(403)
    }

    next()
}

export const requireAdmin = (req: Request , res: Response , next: NextFunction) => {
    const user = res.locals.user

    if(!user || user._doc.role !== "admin") {
        return res.status(403).json({status : false , statusCode: 403 ,message: "anda bukan admin"})
    }

    next()
}