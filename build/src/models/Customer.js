"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    userName: String,
    password: String,
    name: String,
    age: String,
    listIdOrder: [],
    listIdProductFavorite: [],
    urlAvatar: String
});
exports.default = mongoose_1.model('Customer', CustomerSchema, "customers");
