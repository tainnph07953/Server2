import {Request, Response} from "express";

import VoteModel, {Vote} from "../models/Vote";
import ProductModel, {Product} from "../models/Product";
import FavoriteModel, {Favorite} from '../models/Favorite'
import CustomerModel, {Customer} from "../models/Customer";
import OrderDetailModel, {OrderDetail} from "../models/OrderDetail";
import OrderModel, {Order} from "../models/Order";
import UserInformationModel,{userInformation} from "../models/userMobile/userInformation";
import mongoose from "mongoose";
import multer from "multer";
let nameImage: string = ''
const storage = multer.diskStorage({
    destination(req: Request, files, callback) {
        callback(null, './src/public/uploads');
    },
    filename(req: Request, files, callback) {
        // Accept images only
        if (!files.originalname.match(/\.(jpg|JPG|jpeg|JPE|png|PNG)$/)) {
            return callback(new Error('Sai dinh dang'), "");
        }
        const newNameFile = `${Date.now()}-tainnph07953-${files.originalname}`
        nameImage = newNameFile;
        callback(null, newNameFile);
    }
});



import userMobileModel,{usermobile} from "../models/userMobile/userMobile";


class ApiController {
    public async getAllVote(request: Request, response: Response): Promise<void> {
        const listVote = await VoteModel.find().lean()
        response.send(listVote)
    }
    public async signupuser(request: Request, response: Response): Promise<void> {
        const usermobiles : usermobile = new userMobileModel({
            userName: request.body.userName,
            password: request.body.password,
        })
        const user: usermobile[] = await userMobileModel.find().lean()
        for (const item of user) {
            if (item.userName === request.body.userName) {
                response.sendStatus(409)// da ton tai
                return;
            }
        }
        await usermobiles.save((err => {
            if (err) {
                response.sendStatus(400) // loi sever
                return;
            } else {
                response.sendStatus(200); // ok
            }
        }));
    }
    public async signinuser(req: Request, res: Response): Promise<void>{
        const userdata = await userMobileModel.find({userName: req.body.userName, password: req.body.password});
        if (userdata.length === 0) {
            // tslint:disable-next-line:no-console
            console.log('Đăng nhập không thành công')

        } else {
            // console.log(user);
            try {
                const user: usermobile[] = await userMobileModel.find().lean()
                res.send({status: true, msg: ""});
                // tslint:disable-next-line:no-console
            } catch (e) {
                res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
            }
        }
    }
    public async Information(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage, limits: {fieldSize: 10 * 1024 * 1024}}).single('Image')
        upload(request, response, (err) => {
            if (err) {
                response.send(err)
                return
            }
            const usermobiles: userInformation = new UserInformationModel({
                userName: request.body.userName,
                image: 'uploads/' + nameImage,
                appetite: request.body.appetite
            })
            nameImage = '';
            // tslint:disable-next-line:no-shadowed-variable
            usermobiles.save((erSr => {
                if (err) {
                    response.sendStatus(400) // loi sever
                    return;
                } else {
                    response.sendStatus(200); // ok
                }
            }));
        });
        // const upload = await multer({storage, limits: {fieldSize: 10 * 1024 * 1024}}).single('Image')
        // upload(request, response, (err) => {
        //     if (err) {
        //         response.send(err)
        //         return
        //     }
        //     const information: userInformation  = new UserInformationModel({
        //         userName: request.body.userName,
        //         appetite: request.body.appetite,
        //         image: 'uploads/' + nameImage,
        //     })
        //     information.save();
        //     nameImage = ''
        //     response.redirect('vote')
        // })
        // const information : userInformation = new UserInformationModel({
        //     userName: request.body.userName,
        //     appetite: request.body.appetite,
        // })
        // const userInformations: userInformation[] = await UserInformationModel.find().lean()
        // for (const item of userInformations) {
        //     // if (item.userName === request.body.userName) {
        //     //     response.sendStatus(409)// da ton tai
        //     //     return;
        //     // }
        // }
        // await information.save((err => {
        //     if (err) {
        //         response.sendStatus(400) // loi sever
        //         return;
        //     } else {
        //         response.sendStatus(200); // ok
        //     }
        // }));
    }
    public async UpdatePassword(request: Request, response: Response): Promise<void> {
        const id = request.params.userName;
        const user = request.body;
        // tslint:disable-next-line:no-console
        console.log(user);
        const options = {new: true};
        userMobileModel.findByIdAndUpdate(id, user, (err: any, book: any)=>{
            if (err){
                response.send(err);
            }else {
                response.send("thanhcong");
            }
        })
       // userMobileModel
       //      .findOneAndUpdate(
       //          {
       //              userName: request.params.userName  // search query
       //          },
       //          {
       //              userName: request.body.password   // field:values to update
       //          },
       //          {
       //              new: true,                       // return updated doc
       //              runValidators: true              // validate before update
       //          })
       //      .then(doc => {
       //          // tslint:disable-next-line:no-console
       //          console.log(doc)
       //      })
       //      .catch(err => {
       //          // tslint:disable-next-line:no-console
       //          console.error(err)
       //      })
    }

    public async getAllProduct(request: Request, response: Response): Promise<void> {
        const listProduct = await ProductModel.find().lean()
        response.send(listProduct)
    }

    public async getAllFavorite(request: Request, response: Response): Promise<void> {
        const listFavorite = await VoteModel.find().lean()
        response.send(listFavorite)
    }
    public async getAllNearlist(request: Request, response: Response): Promise<void> {
        const listFavorite = await VoteModel.find().lean()
        response.send(listFavorite)
    }
    public async getAllOldList(request: Request, response: Response): Promise<void> {
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

    public async updateLike(request: Request, response: Response): Promise<void> {
        const index = request.body.index;
        const newAmount = request.body.newAmount;
        const vote = await VoteModel.find().lean()
        let idVote = '';
        vote.forEach((item) => {
            if (item.like.toString() === request.body.like || item.dislike.toString() === request.body.dislike) {
                idVote = item._id.toString()
            }
        })
        const order = await OrderModel.findById(idVote)
        if (order != null) {
            order.listProduct[Number(index)].amount = newAmount;
            await OrderModel.findByIdAndUpdate(idVote, {listProduct: order.listProduct}, err => {
                if (err) {
                    response.sendStatus(400)
                } else {
                    response.sendStatus(200)
                }
                ;
            })
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
