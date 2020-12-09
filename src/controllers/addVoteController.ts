import { Request, Response } from 'express'
import multer from "multer";
import VoteModel, { Vote } from '../models/Vote'
import ProductModel from "../models/Product";
import Axios from 'axios';

let nameImage: string[] = []
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
        nameImage.push(`uploads/${newNameFile}`);
        callback(null, newNameFile);
    }
});

class AddVoteController {
    public index(request: Request, response: Response) {
        response.render('vote/add_vote', { title: 'Thêm món ăn mới' })
    }

    public async uploadInformation(request: Request, response: Response): Promise<void> {
        const upload = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } }).array('Image', 10)
        upload(request, response, (err: any) => {
            if (err) {
                response.send(err)
                return
            }
            const address = `${request.body.tenDuong},${request.body.xaPhuong},${request.body.quanHuyen},${request.body.thanhPho}`
            const GOOGLE_KEY = "AIzaSyCome9bcD6gNMCccOchpk5itE5C2ClVqH0"
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address.split(" ").join("+"))}&key=${GOOGLE_KEY}`
            Axios(apiUrl).then(responseData => {
                if (responseData.data.status === "OK") {
                    const locationResult = responseData.data.results[0].geometry.location
                    const vote: Vote = new VoteModel({
                        tenMonAn: request.body.tenMonAn,
                        tenCuaHang: request.body.tenCuaHang,
                        xaPhuong: request.body.xaPhuong,
                        quanHuyen: request.body.quanHuyen,
                        thanhPho: request.body.thanhPho,
                        tenDuong: request.body.tenDuong,
                        gioMoCua: request.body.gioMoCua,
                        gioDongCua: request.body.gioDongCua,
                        coordinate: `${locationResult.lat},${locationResult.lng}`,
                        nameImage,
                        like: [],
                        dislike: []
                    });
                    vote.save();
                }
            }).catch(() => { }).finally(() => {
                nameImage = []
                response.redirect('vote')
            })
        })
    }
}
export const addVoteController = new AddVoteController();
