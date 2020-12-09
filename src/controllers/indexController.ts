import {Request,Response} from 'express'

class IndexController {

    public index(request: Request, response: Response) {
        response.render('login',{title:"Login"})
    }
}

export const indexController = new IndexController();