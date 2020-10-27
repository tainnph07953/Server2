import {Request,Response} from 'express'

class HomeController {

    public index(request: Request, response: Response) {
        response.render('products/add_product/add.hbs', {title: 'Thêm sản phẩm'})
    }
}
export const homeController=new HomeController()