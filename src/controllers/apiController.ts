import {Request, Response} from "express";
import VoteModel, {Vote} from "../models/Vote";
import userMobileModel,{usermobile} from "../models/userMobile/userMobile";


class ApiController {
    public async getAllInformation(request: Request, response: Response): Promise<void> {
        const listInformation = await userMobileModel.find().lean()
        response.send(listInformation)
    }

    public async getAllVote(request: Request, response: Response): Promise<void> {
        const listVote = await VoteModel.find().lean()
        response.send(listVote)
    }

    public async getAllFavorite(request: Request, response: Response): Promise<void> {
        const listFavorite = await VoteModel.find().lean()
        response.send(listFavorite)
    }

    public async signupuser(request: Request, response: Response): Promise<void> {
        const usermobiles : usermobile = new userMobileModel({
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
            }
            else if (request.body.password.length < 6){
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
    public async signinuser(req: Request, res: Response): Promise<void>{
        const userdata = await userMobileModel.find({userName: req.body.userName, password: req.body.password});
        if (userdata.length === 0) {
            // tslint:disable-next-line:no-console
            console.log('Đăng nhập thất bại!')
            return ;
        }
        else {
            try {
                // tslint:disable-next-line:no-console
                const userdatas = await userMobileModel.find({userName: req.body.userName}).lean();
                // tslint:disable-next-line:no-console
                console.log("userdata",userdatas)
                res.send({status: true, msg: "",userdatas});
                res.send(userdatas)
            } catch (e) {
                res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
            }
        }

    }

    public async UpdatePassword(request: Request, response: Response): Promise<void> {
        userMobileModel.findOneAndUpdate({userName: request.body.userName}, {$set: {password: request.body.password}},(err,doc) => {
            if (err) {
                response.send(err);
                return;
            }
            else {
                response.send('Đổi mật khẩu thành công')
                // response.json({
                //     message: 'Đổi mật khẩu thành công'
                // });
                return;
            }
        })
    }
    public async Updateappetite(request: Request, response: Response):Promise<void>{
        userMobileModel.findOneAndUpdate({userName: request.body.userName}, {$set: {appetite: request.body.appetite}},(err,doc) => {
            if (err) {
                response.send(err);
                // tslint:disable-next-line:no-console
                console.log( request.body.appetite)
                return;
            }
            else {
                response.send({
                    status: 'true', appetite:request.body.appetite
                });
                // tslint:disable-next-line:no-console
                console.log( request.body.appetite)
                return;
            }
        })
    }

    public async updateLike(request: Request, response: Response): Promise<void> {
        const count =+1;
            VoteModel.findOneAndUpdate({tenMonAn: request.body.tenMonAn, tenCuaHang:request.body.tenCuaHang}, {$set: {like: count}},(err,doc) => {
                if (err) {
                    response.send(err);
                    return;
                }
                else {
                    // const count =+1;
                    response.json({
                        message: 'Thanh cong'
                    });
                    return count;
                }
            })
}

}

export const apiController = new ApiController()
