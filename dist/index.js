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
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }, { id: 3, title: 'cucumber' }];
const adresses = [{ id: 1, value: 'Mira 12' }, { id: 2, value: 'Tulskaya 7' }, { id: 3, value: 'Lenina 6' }];
const parserMiddleWare = (0, body_parser_1.default)({});
app.use(parserMiddleWare);
app.get('/products', (req, res) => {
    if (typeof req.query.title === 'string') {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.get('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.post('/products', (req, res) => {
    const newProduct = {
        id: +new Date().getTime().toString(),
        title: req.body.title
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.put('/products/:id', (req, res) => {
    let product = products.find(p => p.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.get('/adresses', (req, res) => {
    res.send(adresses);
});
app.get('/adresses/:id', (req, res) => {
    let adress = adresses.find(p => p.id === +req.params.id);
    if (adress) {
        res.send(adress);
    }
    else {
        res.send(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
