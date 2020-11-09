import {Request, Response} from 'express'
import VoteModel, {Vote} from '../models/Vote'
import OrderModel from "../models/Order";
import ProductModel from "../models/Product";
import os from "os";

class ListVoteController {
    public async index(request: Request, response: Response): Promise<void> {
        const listVote = await VoteModel.find().lean()
        response.render('vote/list_vote', {listVote, title: 'Danh sách món ăn'})
    }

    public async delete(request: Request, response: Response): Promise<void> {
        await VoteModel.findByIdAndDelete(request.params.id, (err => {
            if (err) {
                response.send(err)
            } else {
                response.redirect('/vote')
            }
        }))
    }

    public async updateLike(request: Request, response: Response): Promise<void> {
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

export const lisVoteController = new ListVoteController()
