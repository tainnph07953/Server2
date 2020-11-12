import {Response, Request} from 'express'
import UserModel, {User} from '../models/User'

class LoginController {
    public index(request: Request, response: Response): void {
        response.render('login/index.hbs',
            {
                isShowNotification: "hidden",
                title: 'Đăng nhập',
                setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
                setMargin: 'margin-top: -60px;',
                isShowNav: 'hidden',
                styleButton:'alert alert-danger m-t-20'
            })
    }

    public async onLogin(request: Request, response: Response): Promise<void> {
        const userNameReq = request.body.userName
        const passwordReq = request.body.password
        const roleReq = request.body.role
        const [users] = await Promise.all([UserModel.findOne({userName: userNameReq, password: passwordReq},)]);
        if (users!=null) {
            response.redirect('/vote')
        } else {
            response.render("login.hbs", {
                status: "Thất bại!", content_status: "Tài khoản hoặc mật khẩu không chính xác.Vui lòng thử lại !",
                isShowNotification: null,
                title: 'Đăng nhập',
                setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
                setMargin: 'margin-top: -60px;',
                isShowNav: 'hidden',
                styleButton:'alert alert-danger m-t-20'
            })
        }
    }
}

export const loginController = new LoginController();
