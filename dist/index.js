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
// 03 express and rest api 1080p
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_router_1 = require("./routes/products-router");
const addresses_router_1 = require("./routes/addresses-router");
// create express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const parserMiddleWare = (0, body_parser_1.default)({});
app.use(parserMiddleWare);
// для всего, что касается адресов с продуктами, используй productsRouter
app.use('/products', products_router_1.productsRouter);
// для всего, что касается адресов с адресами, используй addressesRouter
app.use('/addresses', addresses_router_1.addressesRouter);
// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
