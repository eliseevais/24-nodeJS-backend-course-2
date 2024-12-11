"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const products_service_1 = require("../domain/products-service");
exports.productsRouter = (0, express_1.Router)({});
let titleValidationChain = (0, express_validator_1.body)('title').trim().isLength({
    min: 3,
    max: 10
}).withMessage('title length should be from 3 to 10 symbols');
exports.productsRouter.post('/', titleValidationChain, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield products_service_1.productsService.createProduct(req.body.title);
    res.status(201).send(newProduct);
}));
exports.productsRouter.put('/:id', titleValidationChain, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield products_service_1.productsService.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = yield products_service_1.productsService.findProductsById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
exports.productsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // const foundProducts = productsInMemoryRepository.findProducts(req.query.title?.toString())
    const foundProducts = yield products_service_1.productsService.findProducts(req.query.title
        ? String((_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : '')
        : null);
    res.send(foundProducts);
}));
exports.productsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield products_service_1.productsService.findProductsById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
exports.productsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield products_service_1.productsService.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
