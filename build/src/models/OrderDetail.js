"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderDetailSchema = new mongoose_1.Schema({
    idProduct: mongoose_1.Schema.Types.ObjectId,
    amount: String,
    nameProduct: String,
    urlProduct: String
});
exports.default = mongoose_1.model('OrderDetail', OrderDetailSchema, "orderDetails");
