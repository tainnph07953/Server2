import {Request, Response} from 'express'
import VoteModel, {Vote} from '../models/Vote'
import OrderModel from "../models/Order";
import ProductModel from "../models/Product";
import os from "os";
import multer from "multer";
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
        const idLike = request.body.idLike;
        const idUserLiked = request.body.idUserLiked;
        //
        const vote = await VoteModel.findById(idLike).lean();
        const  userLiked = await VoteModel.findById(idUserLiked).lean();
        //
        if (vote != null) {
            // tslint:disable-next-line:no-console
            console.log();
            // tslint:disable-next-line:triple-equals
            if (vote.like == undefined) {
                await VoteModel.findByIdAndUpdate(idLike, {like: 1});
                response.send("OK");
            } else {
                await VoteModel.findByIdAndUpdate(idLike, {like: vote.like+1 });
                response.send("Cập nhật Like thành công");
            }
        }
    }
    public async updateDisLike(request: Request, response: Response): Promise<void> {
        const idLike = request.body.idLike;
        const vote = await VoteModel.findById(idLike).lean();
        if (vote != null) {
            // tslint:disable-next-line:no-console
            console.log();
            // tslint:disable-next-line:triple-equals
            if (vote.dislike == undefined) {
                await VoteModel.findByIdAndUpdate(idLike, {dislike: 1});
                response.send("OK");
            } else {
                await VoteModel.findByIdAndUpdate(idLike, {dislike: vote.dislike + 1});
                response.send("Cập nhật DisLike thành công");
            }
        }
    }
}
export const lisVoteController = new ListVoteController()
