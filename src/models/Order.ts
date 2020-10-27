import mongoose, {Schema, model} from 'mongoose'
import OrderDetailModel, {OrderDetail} from "./OrderDetail";
export interface Order extends mongoose.Document{
    idCustomer:Schema.Types.ObjectId,
    listProduct:[OrderDetail],
    isSend:boolean,
    status:boolean,
    dateCreated:string,
    userNameCustomer:string,
}

const OrderSchema=new Schema(
    {
        idCustomer:Schema.Types.ObjectId,
        listProduct:[],
        isSend:Boolean,
        status:Boolean,
        dateCreated:String,
        userNameCustomer:String
    }
)

export default model<Order>('Order', OrderSchema,'orders')