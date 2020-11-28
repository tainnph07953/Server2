import {Request, Response} from 'express'
import VoteModel, {Vote} from '../models/Vote'
import OrderModel from "../models/Order";
import ProductModel from "../models/Product";
import os from "os";
import multer from "multer";
import {mongo} from "mongoose";
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
    // public async update(request: Request, response: Response): Promise<void> {
    //     upload(request, response, (err) => {
    //         if (err) {
    //             response.send(err)
    //             return
    //         }
    //
    //         if (nameImage.toString() === "") {
    //             ProductModel.findByIdAndUpdate(request.body.id,
    //                 {
    //                     name: request.body.nameProductUpdate,
    //                     price: request.body.priceProductUpdate,
    //                     amount: request.body.amountProductUpdate,
    //                     brand: request.body.brandProductUpdate,
    //                     size: request.body.sizeProductUpdate,
    //                     tukhoa: request.body.tukhoaUpdate,
    //                     // tslint:disable-next-line:no-shadowed-variable
    //                 }, err => {
    //                     if (err) {
    //                         // tslint:disable-next-line:no-console
    //                         response.send(err)
    //                     } else {
    //                         response.redirect('/product')
    //                     }
    //                 }
    //             )
    //
    //         } else {
    //             ProductModel.findByIdAndUpdate(request.body.id,
    //                 {
    //                     name: request.body.nameProductUpdate,
    //                     price: request.body.priceProductUpdate,
    //                     amount: request.body.amountProductUpdate,
    //                     brand: request.body.brandProductUpdate,
    //                     size: request.body.sizeProductUpdate,
    //                     tukhoa: request.body.tukhoaUpdate,
    //                     urlImage: 'uploads/' + nameImage
    //                     // tslint:disable-next-line:no-shadowed-variable
    //                 }, err => {
    //                     if (err) {
    //                         // tslint:disable-next-line:no-console
    //                         response.send(err)
    //                     } else {
    //                         response.redirect('/product')
    //                     }
    //                 }
    //             )
    //         }
    //         // const product: Product = new ProductModel({
    //         //     name: request.body.nameProduct,
    //         //     price: request.body.price,
    //         //     amount: request.body.amount,
    //         //     urlImage: 'uploads/'+nameImage
    //         // })
    //         // product.save();
    //         nameImage = ''
    //     })

    public async updateLike(request: Request, response: Response): Promise<void> {
        try {
            const idLike = request.body.idLike;
            const idUserLiked = request.body.idUserLiked;
            await VoteModel.findByIdAndUpdate(idLike, {$pull: {dislike: idUserLiked}});
            const hasItem = await VoteModel.findOne({_id: idLike, like: {$in: idUserLiked}})
            if(hasItem) {
                await VoteModel.findByIdAndUpdate(idLike, {$pull: {like: idUserLiked}});
            }else {
                await VoteModel.findByIdAndUpdate(idLike, {$addToSet: {like: idUserLiked}});
            }
            response.send("OK");
        } catch (e) {
            response.send("Error");
        }
    }
    public async updateDisLike(request: Request, response: Response): Promise<void> {
        try {
            const idLike = request.body.idLike;
            const idUserDisliked = request.body.idUserDisliked;
            await VoteModel.findByIdAndUpdate(idLike, {$pull: {like: idUserDisliked}});
            const hasItem = await VoteModel.findOne({_id: idLike, dislike: {$in: idUserDisliked}})
            if(hasItem) {
                await VoteModel.findByIdAndUpdate(idLike, {$pull: {dislike: idUserDisliked}});
            }else {
                await VoteModel.findByIdAndUpdate(idLike, {$addToSet: {dislike: idUserDisliked}});
            }
            response.send("OK");
        } catch (e) {
            response.send("Error");
        }
    }
}
export const lisVoteController = new ListVoteController()
