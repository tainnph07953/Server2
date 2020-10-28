import {Request, Response} from 'express'
import VoteModel, {Vote} from '../models/Vote'
import multer from "multer";
import OrderModel from "../models/Order";

let nameImage: string = '';
const storage = multer.diskStorage({

    destination(req: Request, file, callback) {
        callback(null, './src/public/uploads');
    },
    filename(req: Request, file, callback) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG)$/)) {
            return callback(new Error('Sai dinh dang'), "");
        }
        const newNameFile = `${Date.now()}-tainnph07953-${file.originalname}`
        nameImage = newNameFile;
        callback(null, newNameFile);
    }
});

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

    public async update(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage}).single('selectFile')
        upload(request, response, (err) => {
            if (err) {
                response.send(err)
                return
            }

            if (nameImage.toString() === "") {
                VoteModel.findByIdAndUpdate(request.body.id,
                    {
                        tenMonAn: request.body.tenmonanVoteUpdate,
                        tenShop: request.body.tenshopVoteUpdate,
                        diaChi: request.body.diachiVoteUpdate,
                        gioMoCua: request.body.timeVoteUpdate,
                        like: request.body.likeVoteUpdate,
                        // tslint:disable-next-line:no-shadowed-variable
                    }, err => {
                        if (err) {
                            // tslint:disable-next-line:no-console
                            response.send(err)
                        } else {
                            response.redirect('/vote')
                        }
                    }
                )

            } else {
                VoteModel.findByIdAndUpdate(request.body.id,
                    {
                        tenMonAn: request.body.tenmonanVoteUpdate,
                        tenShop: request.body.tenshopVoteUpdate,
                        diaChi: request.body.diachiVoteUpdate,
                        gioMoCua: request.body.timeVoteUpdate,
                        like: request.body.bancothichVoteUpdate,
                        Anh: 'uploads/' + nameImage
                        // tslint:disable-next-line:no-shadowed-variable
                    }, err => {
                        if (err) {
                            // tslint:disable-next-line:no-console
                            response.send(err)
                        } else {
                            response.redirect('/vote')
                        }
                    }
                )
            }
            nameImage = ''
        })

    }
}

export const lisVoteController = new ListVoteController()
