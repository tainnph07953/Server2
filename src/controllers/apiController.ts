import {Request, Response} from "express";
import ProductModel, {Product} from "../models/Product";
import FavoriteModel, {Favorite} from '../models/Favorite'
import CustomerModel, {Customer} from "../models/Customer";
import OrderDetailModel, {OrderDetail} from "../models/OrderDetail";
import OrderModel, {Order} from "../models/Order";
import VoteModel, {Vote} from "../models/Vote";
import UserInformationModel,{userInformation} from "../models/userMobile/userInformation";
import mongoose from "mongoose";


class ApiController {
    public async  getAllInformation(request: Request, response: Response): Promise<void> {
        const listInformation = await UserInformationModel.find().lean()
        response.send(listInformation)
    }
    public async getAllVote(request: Request, response: Response): Promise<void> {
        const listVote = await VoteModel.find().lean()
        response.send(listVote)
    }

    public async getAllProduct(request: Request, response: Response): Promise<void> {
        const listProduct = await ProductModel.find().lean()
        response.send(listProduct)
    }

    public async getAllFavorite(request: Request, response: Response): Promise<void> {
        const listFavorite = await VoteModel.find().lean()
        response.send(listFavorite)
    }

    public async getAllCustomer(request: Request, response: Response): Promise<void> {
        const listCustomer = await CustomerModel.find().lean()
        response.send(listCustomer)
    }

    public async getOrderByID(request: Request, response: Response): Promise<void> {
        const [order] = await Promise.all([OrderModel.findOne({idCustomer: request.body.idCustomer}).lean()])
        if (order != null) {
            response.send(order.listProduct)
        }
    }

    public async updateOder(request: Request, response: Response): Promise<void> {
        const [order] = await Promise.all([OrderModel.findOne({idCustomer: request.body.idCustomer}).lean()])

        if (order != null) {
            await OrderModel.findByIdAndUpdate(order._id, {isSend: true}, err => {
                if (err) {
                    response.sendStatus(400)
                } else {
                    response.sendStatus(200)
                }
                ;
            })
        }
    }

    public async getOrderStatus(request: Request, response: Response): Promise<void> {
        const [order] = await Promise.all([OrderModel.findOne({idCustomer: request.body.idCustomer}).lean()])

        if (order != null) {
            response.send(order.status.toString());
        }
    }

    public async getOrderIsSend(request: Request, response: Response): Promise<void> {
        const [order] = await Promise.all([OrderModel.findOne({idCustomer: request.body.idCustomer}).lean()])
        if (order != null) {
            response.send(order.isSend.toString());
        }
    }

    public async updateAmountOderDetail(request: Request, response: Response): Promise<void> {
        const index = request.body.index;
        const newAmount = request.body.newAmount;
        const orders = await OrderModel.find().lean()
        let idOrder = '';
        orders.forEach((item) => {
            if (item.idCustomer.toString() === request.body.idCustomer) {
                idOrder = item._id.toString()
            }
        })
        const order = await OrderModel.findById(idOrder)
        if (order != null) {
            order.listProduct[Number(index)].amount = newAmount;
            await OrderModel.findByIdAndUpdate(idOrder, {listProduct: order.listProduct}, err => {
                if (err) {
                    response.sendStatus(400)
                } else {
                    response.sendStatus(200)
                }
                ;
            })
        }

    }

    public async deleteOrderDetail(request: Request, response: Response): Promise<void> {
        const index = request.body.index;
        const orders = await OrderModel.find().lean()
        let idOrder = '';
        orders.forEach((item) => {
            if (item.idCustomer.toString() === request.body.idCustomer) {
                idOrder = item._id.toString()
            }
        })
        const order = await OrderModel.findById(idOrder)
        if (order != null) {
            order.listProduct.splice(Number(index), 1);
            await OrderModel.findByIdAndUpdate(idOrder, {listProduct: order.listProduct}, err => {
                if (err) {
                    response.sendStatus(400)
                } else {
                    response.sendStatus(200)
                }
                ;
            })
        }

    }

    public async createCustomer(request: Request, response: Response): Promise<void> {
        const customer: Customer = new CustomerModel({
            userNameCustomer: request.body.userNameCustomer,
            passwordCustomer: request.body.passwordCustomer,
            name: request.body.name,
            age: request.body.age,
            listIdOrder: [],
            listIdProductFavorite: [],
            urlAvatar: ''
        })
        const customers: Customer[] = await CustomerModel.find().lean()
        for (const item of customers) {
            if (item.userNameCustomer === request.body.userNameCustomer) {
                response.sendStatus(409)// da ton tai
                return;
            }
        }
        await customer.save((err => {
            if (err) {
                response.sendStatus(400) // loi sever
                return;
            } else {
                response.sendStatus(200); // ok
            }
        }));
    }

    public async createOrderDetail(request: Request, response: Response): Promise<void> {
        const orders = await OrderModel.find().lean()
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const currentDay = dd + '/' + mm + '/' + yyyy;
        const orderDetail: OrderDetail = new OrderDetailModel({
            idProduct: mongoose.Types.ObjectId(request.body.idProduct),
            amount: '1',
            nameProduct: request.body.nameProduct,
            urlProduct: request.body.urlProduct,
            price: request.body.price,
            brand: request.body.brand,
            size: request.body.size,
        })
        await orderDetail.save();
        let hasOrder = false;
        let idOrderExist = '';
        orders.forEach((item) => {
            if (item.idCustomer.toString() === request.body.idCustomer) {
                hasOrder = true;
                idOrderExist = item._id.toString()
            }
        })
        if (hasOrder) {
            const [order] = await Promise.all([OrderModel.findById(idOrderExist)])
            if (order != null) {
                order.listProduct.push(orderDetail)
                // @ts-ignore
                await OrderModel.findByIdAndUpdate(idOrderExist, {listProduct: order.listProduct}, err => {
                    if (err) {
                        response.sendStatus(400)
                    } else {
                        response.sendStatus(200)
                    }
                    ;
                })
            }
            ;


        } else {
            const order: Order = new OrderModel({
                idCustomer: mongoose.Types.ObjectId(request.body.idCustomer),
                listProduct: [{
                    idProduct: mongoose.Types.ObjectId(request.body.idProduct),
                    amount: request.body.amount,
                    nameProduct: request.body.nameProduct,
                    urlProduct: request.body.urlProduct,
                    price: request.body.price,
                    brand: request.body.brand,
                    size: request.body.size,
                }],
                isSend: false,
                status: false,
                dateCreated: currentDay.toString(),
                userNameCustomer: request.body.userNameCustomer,
            })
            await order.save((err => {
                if (err) {
                    response.sendStatus(400)
                } else {
                    response.sendStatus(200)
                }
            }));
        }
    }

}

export const apiController = new ApiController()
