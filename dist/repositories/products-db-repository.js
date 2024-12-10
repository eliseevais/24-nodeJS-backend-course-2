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
exports.productsRepository = void 0;
const db_1 = require("./db");
// проблема, не подключается к порту, не происходят запросы на сервер, не работает постман (у димыча был файл для импорта, у меня этого файла нет, создала по аналогии с запросами rest
exports.productsRepository = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (title) {
            //   return productsCollection.find({title: {$regex: title}}).toArray()
            // } else {
            //   return productsCollection.find().toArray()
            // }
            // refactoring
            const filter = {};
            if (title) {
                filter.title = { $regex: title };
            }
            return db_1.productsCollection.find(filter).toArray();
        });
    },
    findProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield db_1.productsCollection.findOne({ id: id });
            if (product) {
                return product;
            }
            else {
                return null;
            }
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = {
                id: +new Date().getTime().toString(),
                title: title
            };
            const result = yield db_1.productsCollection.insertOne(newProduct);
            return newProduct;
        });
    },
    updateProduct(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productsCollection.updateOne({ id: id }, { $set: { title: title } });
            return result.matchedCount === 1;
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    }
};
