"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddProductController {
    index(request, response) {
        response.render('products/add_product/add.hbs', { title: 'Thêm sản phẩm' });
    }
}
exports.addProductController = new AddProductController();
