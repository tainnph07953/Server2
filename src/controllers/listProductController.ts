import {Request, Response} from 'express'
import ProductModel, {Product} from '../models/Product'
import multer from "multer";

let nameImage: string = '';
const storage = multer.diskStorage({

    destination(req: Request, file, callback) {
        callback(null, './src/public/uploads');
    },
    filename(req: Request, file, callback) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG)$/)) {
            return callback(new Error('Sai dinh dang'), "");
        }
        const newNameFile = `${Date.now()}-tainnph07953-${file.originalname}`
        nameImage = newNameFile;
        callback(null, newNameFile);
    }
});

class ListProductController {
    public async index(request: Request, response: Response): Promise<void> {
        const listProduct = await ProductModel.find().lean()
        response.render('products/list_product', {listProduct, title: 'Danh sách món ăn'})
    }

    public async delete(request: Request, response: Response): Promise<void> {
        // tslint:disable-next-line:only-arrow-functions
        await ProductModel.findByIdAndDelete(request.params.id, (err => {
            if (err) {
                // tslint:disable-next-line:no-console
                response.send(err)
            } else {
                response.redirect('/product')
            }
        }))
    }
}

export const listProductController = new ListProductController()
