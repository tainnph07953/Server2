import {Request, Response} from 'express'
import multer from "multer";
import ProductModel, {Product} from '../models/Product'
let nameImage: string=''

const storage = multer.diskStorage({
    destination(req: Request, files, callback) {
        callback(null, './src/public/uploads');
    },
    filename(req: Request, files, callback) {
        // Accept images only
        if (!files.originalname.match(/\.(jpg|JPG|jpeg|JPE|png|PNG)$/)) {
            return callback(new Error('Sai dinh dang'), "");
        }
        const newNameFile = `${files.originalname + ';' + files.originalname}`
        nameImage=newNameFile;
        callback(null, newNameFile);
    }
});
class AddProductController {
    public index(request: Request, response: Response) {
        response.render('products/add_product/add.hbs', {title: 'Thêm món ăn'})
    }

    public async uploadInformation(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage}).array('selectFile',10);
        upload(request, response, (err) => {
            if (err) {
               response.send(err)
                return
            }
            const product: Product = new ProductModel({
                name: request.body.nameProduct,
                price: request.body.price,
                amount: request.body.amount,
                brand: request.body.brand,
                size: request.body.size,
                tukhoa: request.body.tukhoa,
                urlImage: nameImage
            })
            product.save();
            nameImage=''
            response.redirect('/product')
        })
    }
}

export const addProductController = new AddProductController()
