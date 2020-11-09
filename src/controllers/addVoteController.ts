import {Request, Response} from 'express'
import multer from "multer";
import VoteModel, {Vote} from '../models/Vote'
import OrderModel from "../models/Order";
import ProductModel from "../models/Product";
import os from "os";

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

class AddVoteController {
    public index(request: Request, response: Response) {
        response.render('vote/add_Vote', {title: 'Đánh giá món ăn'})
    }

    public async uploadInformation(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage, limits: {fieldSize: 10 * 1024 * 1024}}).array('Anh', 10)
        upload(request, response, (err) => {
            if (err) {
                response.send(err)
                return
            }
            const vote: Vote = new VoteModel({
                tenMonAn: request.body.tenMonAn,
                tenCuaHang: request.body.tenCuaHang,
                diaChi: request.body.diaChi,
                gioMoCua: request.body.gioMoCua,
                gioDongCua: request.body.gioDongCua,
                nameImage: 'uploads/' + nameImage,
                like: request.body.like,
                dislike: request.body.dislike
            })
            vote.save();
            nameImage = ''
            response.redirect('vote')
        })
    }
}

export const addVoteController = new AddVoteController();
