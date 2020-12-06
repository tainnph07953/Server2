import mongoose, {Schema,model} from 'mongoose'


export interface Product extends mongoose.Document{
    name: string,
    phone:string,
    date:string,
    status:string,
    urlImage:string,
}
const ProductSchema=new Schema(
    {
        name: String,
        phone:String,
        date:String,
        status: String,
        urlImage:String,
    }
)
export default model<Product>('Product',ProductSchema,"store")
