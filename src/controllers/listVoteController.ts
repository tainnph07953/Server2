import {Request, Response} from 'express'
import VoteModel, {Vote} from '../models/Vote'
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
