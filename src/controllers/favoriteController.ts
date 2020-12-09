import {Request,Response} from 'express'

class FavoriteController {
    public index(request: Request, response: Response) {
        response.render('favorite/list_favorite.hbs', {title: 'Danh sách món ăn yêu thích'})
    }
}
export const favoriteController = new FavoriteController()