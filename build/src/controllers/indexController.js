"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(request, response) {
        response.render('login', { title: "Login" });
    }
}
exports.indexController = new IndexController();
