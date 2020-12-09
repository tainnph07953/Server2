"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class RegisterController {
    index(request, response) {
        response.render('register/index.hbs', {
            isShowNotification: "hidden",
            title: 'Register',
            setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
            setMargin: 'margin-top: -60px;',
            isShowNav: 'hidden'
        });
    }
    onRegister(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userNameRegister, passwordRegister, rePasswordRegister } = request.body;
            const [users] = yield Promise.all([User_1.default.findOne({ userName: userNameRegister })]);
            if (passwordRegister.toString() !== rePasswordRegister.toString()) {
                response.render("register/index.hbs", {
                    status: "Thất bại!", content_status: "Mật khẩu không khớp nhau. Vui lòng nhập lại",
                    isShowNotification: null,
                    title: 'Đăng ký',
                    setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
                    setMargin: 'margin-top: -60px;',
                    isShowNav: 'hidden',
                });
                return;
            }
            else {
                if (users != null) {
                    response.render("register/index.hbs", {
                        status: "Thất bại!", content_status: "Tài khoản đã tồn tại!!!",
                        isShowNotification: null,
                        title: 'Đăng ký',
                        setShowNav: 'sb-nav-fixed sb-sidenav-toggled',
                        setMargin: 'margin-top: -60px;',
                        isShowNav: 'hidden'
                    });
                }
                else {
                    console.log(userNameRegister);
                    console.log(passwordRegister);
                    const user = new User_1.default({ userName: userNameRegister, password: passwordRegister });
                    yield user.save();
                    response.redirect('/login');
                }
            }
        });
    }
}
exports.registerController = new RegisterController();
