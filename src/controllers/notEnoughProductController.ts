import {Response, Request} from "express";
import OrderModel, {Order} from "../models/Order";
import ProductModel from "../models/Product";
import os from "os";

class NotEnoughProductController {
    public async index(request: Request, response: Response): Promise<void> {
        const listOrder = await OrderModel.find().lean()
        response.render('not_enough_product/index', {
            listOrder, title: 'Đơn hàng', isShow: null,
            typeStyle: "alert alert-danger alert-dismissible fade show",
            content:"Không đủ sản phẩm"
        })
    }

    public async update(request: Request, response: Response): Promise<void> {
        const [order] = await Promise.all([OrderModel.findById(request.params.id).lean()])
        // tslint:disable-next-line:no-console
        const listPositionNotEnough = []
        const listAmountNotEnough = []
        if (order != null) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < order.listProduct.length; i++) {
                const product
                    = await ProductModel.findById(order.listProduct[i].idProduct).lean()
                if (product != null) {
                    if (Number(order.listProduct[i].amount) > Number(product.amount)) {
                        listPositionNotEnough.push(i)
                        listAmountNotEnough.push(Number(order.listProduct[i].amount) - Number(product.amount))
                    }
                }
            }

            if (listAmountNotEnough.length !== 0) {
                let message = '';
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < listPositionNotEnough.length; i++) {
                    // tslint:disable-next-line:no-console
                    message += order.listProduct[listPositionNotEnough[i]].nameProduct + " thiếu " + listAmountNotEnough[i] + os.EOL
                }
                response.redirect('/not_enough_product')

                return;
            } else {

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < order.listProduct.length; i++) {
                    const product = await ProductModel.findById(order.listProduct[i].idProduct).lean()

                    if (product != null) {
                        await ProductModel.findByIdAndUpdate(order.listProduct[i].idProduct, {amount: -Number(order.listProduct[i].amount) + Number(product.amount)})
                    }
                }
                await OrderModel.findByIdAndUpdate(request.params.id, {status: true}, err => {
                        if (err) {
                            // tslint:disable-next-line:no-console
                            response.send(err)
                        } else {
                            response.redirect('/order')
                        }
                    }
                )
            }
        }
    }
}
export const notEnoughProductController=new NotEnoughProductController()