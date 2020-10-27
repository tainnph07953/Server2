"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    idCustomer: String,
    listProduct: [],
    isSend: Boolean,
    status: Boolean,
    dateCreated: String,
    userNameCustomer: String
});
exports.default = mongoose_1.model('Order', OrderSchema, 'orders');
