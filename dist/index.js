"use strict";
// 01 lesson
// import express, {Request, Response} from 'express';
//
// const app = express()
// const port = 3000
//
// app.get('/', (req: Request, res: Response) => {
//   let helloMessage = 'Hello Incubator!';
//   res.send(helloMessage)
// })
//
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// --------------------------------------------------------------------------------------------------------------------
// 03 express and rest api 1080p
// import express, {Request, Response} from 'express';
// import bodyParser from 'body-parser';
// import {productsRouter} from "./routes/products-router";
// import {addressesRouter} from "./routes/addresses-router";
//
// // create express app
// const app = express();
// const port = process.env.PORT || 5000;
//
//
// const parserMiddleWare = bodyParser({})
// app.use(parserMiddleWare)
//
//
//
// // для всего, что касается адресов с продуктами, используй productsRouter
// app.use('/products', productsRouter);
// // для всего, что касается адресов с адресами, используй addressesRouter
// app.use('/addresses', addressesRouter)
//
// // start app
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });
// --------------------------------------------------------------------------------------------------------------------
// lesson 06 express middleware, chain of responsibility
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const blablaMiddleware = (req, res, next) => {
    // @ts-ignore
    req.blabla = "hello";
    next();
};
const authGuardMiddleware = (req, res, next) => {
    // @ts-ignore
    if (req.query.token == "123") {
        next();
    }
    else {
        res.send(401);
    }
};
let requestCounter = 0;
const requestCounterdMiddleware = (req, res, next) => {
    // @ts-ignore
    requestCounter++;
    next();
};
// app.use(requestCounterdMiddleware);
app.use(blablaMiddleware);
app.use(authGuardMiddleware);
const port = process.env.PORT || 5000;
app.get('/products', blablaMiddleware, (req, res) => {
    // @ts-ignore
    const blabla = req.blabla;
    // res.send({value: "it-incubator"})
    res.send({ value: blabla + " !!! " + requestCounter });
});
app.get('/users', (req, res) => {
    // @ts-ignore
    const blabla = req.blabla;
    // res.send({value: "it-incubator"})
    res.send({ value: blabla + " from users " + requestCounter });
});
// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
