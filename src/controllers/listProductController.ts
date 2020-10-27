import {Request, Response} from 'express'
import ProductModel, {Product} from '../models/Product'
import multer from "multer";
import OrderModel from "../models/Order";

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
        const newNameFile = `${Date.now()}-Nambdph07444-${file.originalname}`
        nameImage = newNameFile;
        callback(null, newNameFile);
    }
});

class ListProductController {
    public async index(request: Request, response: Response): Promise<void> {
        const listProduct = await ProductModel.find().lean()
        response.render('products/list_product', {listProduct, title: 'Danh sách sản phẩm'})
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

    public async update(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage}).single('selectFile')
        upload(request, response, (err) => {
            if (err) {
                response.send(err)
                return
            }

            if (nameImage.toString() === "") {
                ProductModel.findByIdAndUpdate(request.body.id,
                    {
                        name: request.body.nameProductUpdate,
                        price: request.body.priceProductUpdate,
                        amount: request.body.amountProductUpdate,
                        brand: request.body.brandProductUpdate,
                        size: request.body.sizeProductUpdate,
                        // tslint:disable-next-line:no-shadowed-variable
                    }, err => {
                        if (err) {
                            // tslint:disable-next-line:no-console
                            response.send(err)
                        } else {
                            response.redirect('/product')
                        }
                    }
                )

            } else {
                ProductModel.findByIdAndUpdate(request.body.id,
                    {
                        name: request.body.nameProductUpdate,
                        price: request.body.priceProductUpdate,
                        amount: request.body.amountProductUpdate,
                        brand: request.body.brandProductUpdate,
                        size: request.body.sizeProductUpdate,
                        urlImage: 'uploads/' + nameImage
                        // tslint:disable-next-line:no-shadowed-variable
                    }, err => {
                        if (err) {
                            // tslint:disable-next-line:no-console
                            response.send(err)
                        } else {
                            response.redirect('/product')
                        }
                    }
                )
            }
            // const product: Product = new ProductModel({
            //     name: request.body.nameProduct,
            //     price: request.body.price,
            //     amount: request.body.amount,
            //     urlImage: 'uploads/'+nameImage
            // })
            // product.save();
            nameImage = ''
        })

    }
}

export const listProductController = new ListProductController()