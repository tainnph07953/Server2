"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const key_1 = require("./key");
mongoose_1.default.connect(key_1.mongodb.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(db => console.log('DB is connected')).catch(err => console.log(err));
