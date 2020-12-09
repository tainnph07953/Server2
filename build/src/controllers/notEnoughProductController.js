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
const Product_1 = __importDefault(require("../models/Product"));
const os_1 = __importDefault(require("os"));
class NotEnoughProductController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listOrder = yield Order_1.default.find().lean();
            response.render('not_enough_product/index', {
                listOrder, title: 'Đơn hàng', isShow: null,
                typeStyle: "alert alert-danger alert-dismissible fade show",
                content: "Không đủ sản phẩm"
            });
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const [order] = yield Promise.all([Order_1.default.findById(request.params.id).lean()]);
            const listPositionNotEnough = [];
            const listAmountNotEnough = [];
            if (order != null) {
                for (let i = 0; i < order.listProduct.length; i++) {
                    const product = yield Product_1.default.findById(order.listProduct[i].idProduct).lean();
                    if (product != null) {
                        if (Number(order.listProduct[i].amount) > Number(product.amount)) {
                            listPositionNotEnough.push(i);
                            listAmountNotEnough.push(Number(order.listProduct[i].amount) - Number(product.amount));
                        }
                    }
                }
                if (listAmountNotEnough.length !== 0) {
                    let message = '';
                    for (let i = 0; i < listPositionNotEnough.length; i++) {
                        message += order.listProduct[listPositionNotEnough[i]].nameProduct + " thiếu " + listAmountNotEnough[i] + os_1.default.EOL;
                    }
                    response.redirect('/not_enough_product');
                    return;
                }
                else {
                    for (let i = 0; i < order.listProduct.length; i++) {
                        const product = yield Product_1.default.findById(order.listProduct[i].idProduct).lean();
                        if (product != null) {
                            yield Product_1.default.findByIdAndUpdate(order.listProduct[i].idProduct, { amount: -Number(order.listProduct[i].amount) + Number(product.amount) });
                        }
                    }
                    yield Order_1.default.findByIdAndUpdate(request.params.id, { status: true }, err => {
                        if (err) {
                            response.send(err);
                        }
                        else {
                            response.redirect('/order');
                        }
                    });
                }
            }
        });
    }
}
exports.notEnoughProductController = new NotEnoughProductController();
