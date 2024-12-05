"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositories/products-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.productsRouter = (0, express_1.Router)({});
exports.productsRouter.get('/', (req, res) => {
    var _a, _b;
    // const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    const foundProducts = products_repository_1.productsRepository.findProducts(req.query.title
        ? String((_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : '')
        : null);
    res.send(foundProducts);
});
exports.productsRouter.get('/:id', (req, res) => {
    let product = products_repository_1.productsRepository.findProductsById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
let titleValidationChain = (0, express_validator_1.body)('title').trim().isLength({
    min: 3,
    max: 10
}).withMessage('title length should be from 3 to 10 symbols');
exports.productsRouter.post('/', titleValidationChain, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const newProduct = products_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});
exports.productsRouter.put('/:id', titleValidationChain, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const isUpdated = products_repository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = products_repository_1.productsRepository.findProductsById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.delete('/:id', (req, res) => {
    const isDeleted = products_repository_1.productsRepository.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
