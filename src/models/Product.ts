import mongoose, {Schema,model} from 'mongoose'


export interface Product extends mongoose.Document{
    name: string,
    price:string,
    urlImage:string,
    amount:number,
    brand:string,
    size:string
}
const ProductSchema=new Schema(
    {
        name: String,
        price:String,
        urlImage:String,
        amount:Number,
        brand:String,
        size:String
    }
)
export default model<Product>('Product',ProductSchema,"products")
