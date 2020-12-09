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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
class ListProductController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listProduct = yield Product_1.default.find().lean();
            response.render('products/list_product', { listProduct, title: 'Danh sách sản phẩm' });
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Product_1.default.findByIdAndDelete(request.params.id, (err => {
                if (err) {
                    response.send(err);
                }
                else {
                    response.redirect('/product');
                }
            }));
        });
    }
}
exports.listProductController = new ListProductController();
