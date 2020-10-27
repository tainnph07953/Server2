import mongoose, {Schema, model} from 'mongoose'

export interface Favorite extends mongoose.Document{
   name: string,
    price : string,
    urlImage: string,
    amount:number,
    brand:string,
    size:string
}
const FavoriteSchema =new Schema({
    name: String,
    price: String,
    urlImage: String,
    amount: String,
    brand: String,
    size: String
})

export default model<Favorite>('Favorite', FavoriteSchema,'favorite')
