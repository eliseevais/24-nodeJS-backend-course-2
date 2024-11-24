"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const adresses = [{ id: 1, value: 'Mira 12' }, { id: 2, value: 'Tulskaya 7' }, { id: 3, value: 'Lenina 6' }];
exports.addressesRouter = (0, express_1.Router)({});
exports.addressesRouter.get('/', (req, res) => {
    res.send(adresses);
});
exports.addressesRouter.get('/:id', (req, res) => {
    let adress = adresses.find(p => p.id === +req.params.id);
    if (adress) {
        res.send(adress);
    }
    else {
        res.send(404);
    }
});
