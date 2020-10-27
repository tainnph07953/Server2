import mongoose, {Schema, model} from 'mongoose'
export interface OrderDetail extends mongoose.Document{
    idProduct: Schema.Types.ObjectId
    amount:string,
    nameProduct:string,
    urlProduct:string,
    price:string,
    brand:string,
    size:string
}
const OrderDetailSchema=new Schema(
    {
        idProduct: Schema.Types.ObjectId,
        amount:String,
        nameProduct:String,
        urlProduct:String,
        price:String,
        brand:String,
        size:String
    }
)

export default model<OrderDetail>('OrderDetail',OrderDetailSchema,"orderDetails")