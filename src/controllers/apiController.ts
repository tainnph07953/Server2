import {Request, Response} from "express";

import VoteModel, {Vote} from "../models/Vote";

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
                res.send({status: true, msg: ""});
            } catch (e) {
                res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
            }
        }
    }

    public async UpdatePassword(request: Request, response: Response): Promise<void> {
        const id = request.params.id;
        const user: usermobile[] = request.body;
        const users = await userMobileModel.findByIdAndUpdate(id, user).setOptions({ userName: false, password: true });
        if (users) {
            response.send(users);
        } else {
            // @ts-ignore
            next(new PostNotFoundException(id));
        }
    }
}

export const apiController = new ApiController()
