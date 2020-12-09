"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    index(request, response) {
        response.render('home/index.hbs', { title: 'Trang chủ' });
    }
}
exports.homeController = new HomeController();
