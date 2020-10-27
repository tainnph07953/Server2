import {Response, Request} from "express";
import OrderModel, {Order} from "../models/Order";
import ProductModel, {Product} from '../models/Product'
import os from 'os'


class OrderController {
    public async index(request: Request, response: Response): Promise<void> {
        const listOrders:Order[] = await OrderModel.find().lean()
        const listOrder: Order[]=[];
        listOrders.forEach((item)=>{
            if(item.isSend){
                listOrder.push(item);
            }
        } )
        response.render('order/index', {listOrder, title: 'Đơn hàng', isShow: "hidden"})
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

export const orderController = new OrderController()