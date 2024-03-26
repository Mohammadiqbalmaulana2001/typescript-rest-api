import express, {Application , Response , Request , NextFunction} from 'express';

const app:Application = express();
const port:Number = 4000

app.use('/', (req: Request , res: Response , next: NextFunction) => {
    res.status(200).send('hello world')
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})