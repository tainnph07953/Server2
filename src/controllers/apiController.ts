import {Request, Response} from "express";
import VoteModel, {Vote} from "../models/Vote";
import userMobileModel, {usermobile} from "../models/userMobile/userMobile";
import axios from 'axios';

class ApiController {
    public async getAllInformation(request: Request, response: Response): Promise<void> {
        const listInformation = await userMobileModel.find().lean()
        response.send(listInformation)
    }

    public async getAllVote(request: Request, response: Response): Promise<void> {
        const listVote = await VoteModel.find().lean()
        response.send(listVote)
    }
    public async getAllNearlist(request: Request, response: Response): Promise<void> {
        const listFavorite = await VoteModel.find().lean()
        response.send(listFavorite)
    }
    public async getAllOldList(request: Request, response: Response): Promise<void> {
        const listFavorite = await VoteModel.find().lean()
        response.send(listFavorite)
    }

    public async getAllFavorite(request: Request, response: Response): Promise<void> {
        const listFavorite = await VoteModel.find().lean()
        response.send(listFavorite)
    }

    public async signupuser(request: Request, response: Response): Promise<void> {
        const usermobiles: usermobile = new userMobileModel({
            userName: request.body.userName,
            password: request.body.password,
            appetite: request.body.appetite
        })
        const user: usermobile[] = await userMobileModel.find().lean()
        for (const item of user) {
            if (item.userName === request.body.userName) {
                response.send('Tài khoản đã tồn tại')
                // response.sendStatus(409)// da ton tai
                return;
            } else if (request.body.password.length < 6) {
                response.send('Mật khẩu phải lớn hơn hoặc bằng 6 ký tự')
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

    public async signinuser(req: Request, res: Response): Promise<void> {
        const userdata = await userMobileModel.find({userName: req.body.userName, password: req.body.password});
        if (userdata.length === 0) {
            // tslint:disable-next-line:no-console
            res.send("Đăng nhập thất bại");
            return;
        } else {
            try {
                // tslint:disable-next-line:no-console
                const userdatas = await userMobileModel.find({userName: req.body.userName}).lean();
                // tslint:disable-next-line:no-console
                console.log("userdata", userdatas)
                res.send({status: true, msg: "", userdatas});
                res.send(userdatas)
            } catch (e) {
                res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
            }
        }

    }

    public async UpdatePassword(request: Request, response: Response): Promise<void> {
        userMobileModel.findOneAndUpdate({userName: request.body.userName}, {$set: {password: request.body.password}}, (err, doc) => {
            if (err) {
                response.send(err);
                return;
            } else {
                response.send('Đổi mật khẩu thành công')
                // response.json({
                //     message: 'Đổi mật khẩu thành công'
                // });
                return;
            }
        })
    }

    public async Updateappetite(request: Request, response: Response): Promise<void> {
        userMobileModel.findOneAndUpdate({userName: request.body.userName}, {$set: {appetite: request.body.appetite}}, (err, doc) => {
            if (err) {
                response.send(err);
                // tslint:disable-next-line:no-console
                console.log(request.body.appetite)
                return;
            } else {
                response.send({
                    status: 'true', appetite: request.body.appetite
                });
                // tslint:disable-next-line:no-console
                console.log(request.body.appetite)
                return;
            }
        })
    }

    public async getCoord(request: Request, response: Response) {
        try {
            const address: any = request.query.address
            if (!address) {
                return response.status(400).json({status: "Error", message: "Không có địa chỉ"})
            }
            const GOOGLE_KEY = "AIzaSyCome9bcD6gNMCccOchpk5itE5C2ClVqH0"
            const responseData = await axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address.split(" ").join("+"))}&key=${GOOGLE_KEY}`)
            if (responseData.data.status === "OK") {
                const locationResult = responseData.data.results[0].geometry.location
                const coord = {
                    latitude: locationResult.lat,
                    longitude: locationResult.lng,
                }
                return response.status(200).json({status: "Success", coord})
            }
            return response.status(400).json({status: "Error", message: "Không tìm thấy vị trí"})
        } catch (e) {
            response.status(400).json({status: "Error", message: e.message})
        }
    }

    public async InforFood(req: Request, res: Response) {
        const _id = req.body._id;
        if (_id.length === 0) {
            // tslint:disable-next-line:no-console
            res.send("Bạn chưa nhập món ăn !");
            return;
        } else {
            try {
                // tslint:disable-next-line:no-console
                const dataFood = await VoteModel.find({_id: req.body._id}).lean();
                // tslint:disable-next-line:no-console
                console.log("dataFood", dataFood)
                res.send({status: true, msg: "", dataFood});
                res.send(dataFood)
            } catch (e) {
                res.send("Không tìm thấy món ăn của bạn !")
            }
        }

    }
}

export const apiController = new ApiController()
