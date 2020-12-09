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
const Order_1 = __importDefault(require("../models/Order"));
const mongoose_1 = __importDefault(require("mongoose"));
class StatisticalController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listOrder = yield Order_1.default.find().lean();
            const listIdProductInOrder = new Set();
            const listCountProduct = [];
            const listNameCountProduct = [];
            for (let i = 0; i < listOrder.length; i++) {
                for (let j = 0; j < listOrder[i].listProduct.length; j++) {
                    listIdProductInOrder.add(String(listOrder[i].listProduct[j].idProduct));
                }
            }
            listIdProductInOrder.forEach(value => {
                let count = 0;
                let name = '';
                for (let i = 0; i < listOrder.length; i++) {
                    for (let j = 0; j < listOrder[i].listProduct.length; j++) {
                        if (String(listOrder[i].listProduct[j].idProduct) === String(mongoose_1.default.Types.ObjectId(value))
                            && listOrder[i].status === true) {
                            count += Number(listOrder[i].listProduct[j].amount);
                            name = listOrder[i].listProduct[j].nameProduct;
                        }
                    }
                }
                if (count > 0) {
                    listCountProduct.push(count);
                    listNameCountProduct.push(name);
                }
            });
            let listCountProductSend = '';
            let listNameCountProductSend = '';
            for (let i = 0; i < listNameCountProduct.length; i++) {
                if (i === listNameCountProduct.length - 1) {
                    listNameCountProductSend += `"${listNameCountProduct[i]}"`;
                }
                else {
                    listNameCountProductSend += `"${listNameCountProduct[i]}",`;
                }
            }
            for (let i = 0; i < listCountProduct.length; i++) {
                if (i === listCountProduct.length - 1) {
                    listCountProductSend += `${listCountProduct[i]}`;
                }
                else {
                    listCountProductSend += `${listCountProduct[i]},`;
                }
            }
            response.render('statistical/index', { listCountProductSend, listNameCountProductSend, title: 'Thống kê' });
        });
    }
}
exports.statisticalController = new StatisticalController();
