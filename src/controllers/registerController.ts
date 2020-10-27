import {Response, Request} from 'express'
import UserModel, {User} from "../models/User";

class RegisterController {

    public index(request: Request, response: Response): void {
        response.render('register/index.hbs',
            {
                isShowNotification: "hidden",
                title: 'Register',
                setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
                setMargin: 'margin-top: -60px;',
                isShowNav: 'hidden'
            })
    }

    public async onRegister(request: Request, response: Response): Promise<void> {
        const {userNameRegister, passwordRegister, rePasswordRegister} = request.body;

        const [users] = await Promise.all([UserModel.findOne({userName: userNameRegister},)]);
        if (passwordRegister.toString() !== rePasswordRegister.toString()) {
            response.render("register/index.hbs", {
                status: "Thất bại!", content_status: "Không khớp, vui lòng nhập lại mật khẩu !!!",
                isShowNotification: null,
                title: 'Đăng ký',
                setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
                setMargin: 'margin-top: -60px;',
                isShowNav: 'hidden',
            })
            return;
        } else {
            if (users != null) {
                response.render("register/index.hbs", {
                    status: "Thất bại!", content_status: "Tài khoản đã tồn tại!!!",
                    isShowNotification: null,
                    title: 'Đăng ký',
                    setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
                    setMargin: 'margin-top: -60px;',
                    isShowNav: 'hidden'
                })
            } else {
                // tslint:disable-next-line:no-console
                console.log(userNameRegister)
                // tslint:disable-next-line:no-console
                console.log(passwordRegister)
                const user: User = new UserModel({userName: userNameRegister, password:passwordRegister})
                await user.save();
                response.redirect('/login')
            }
        }


    }
}

export const registerController = new RegisterController()