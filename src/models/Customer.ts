import mongoose, {Schema, model} from 'mongoose'


export interface Customer extends mongoose.Document {
    userNameCustomer: string,
    passwordCustomer: string,
    name: string,
    age: string,
    listIdOrder: [],
    listIdProductFavorite: [],
    urlAvatar: string

}

const CustomerSchema = new Schema(
    {
        userNameCustomer: {type: String,unique:true,required: true},
        passwordCustomer: String,
        name: String,
        age: String,
        listIdOrder: [],
        listIdProductFavorite:[],
        urlAvatar: String
    }
)
export default model<Customer>('Customer', CustomerSchema,"customers")