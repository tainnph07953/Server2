"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: String,
    price: String,
    urlImage: String,
    amount: Number
});
exports.default = mongoose_1.model('Product', ProductSchema, "products");
