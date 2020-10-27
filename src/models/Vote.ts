import mongoose,{Schema,model} from 'mongoose'


export interface Vote extends mongoose.Document{
    tenMonAn:string,
    tenShop: string,
    diaChi: string,
    gioMoCua: string,
    hinhAnh: string,
    banCoThich: string
}

const VoteSchema = new Schema(
    {
        tenMonAn: String,
        tenShop: String,
        diaChi: String,
        gioMoCua: String,
        hinhAnh: String,
        banCoThich: String
    }
);

export default model<Vote>('vote', VoteSchema,"votes")
