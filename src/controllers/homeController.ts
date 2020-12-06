import {Request,Response} from 'express'

class HomeController {

    public index(request: Request, response: Response): void{
        response.render('home/index.hbs',{title:'Trang chủ'})
    }
}
export const homeController=new HomeController()