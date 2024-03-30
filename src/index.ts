import express, {Application} from 'express';
import { Routes } from './routes';
import { logger } from './utils/logger';
import bodyParser from 'body-parser';
import cors from 'cors';

import './utils/connectDB'
import deserializeToken from './middleware/deserializeToken';

const app:Application = express();
const port:Number = 4000

// midleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(deserializeToken)

// cors
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS'),
    next()
})

Routes(app)

app.listen(port, () => {
    logger.info(`server started at http://localhost:${port}`)
})