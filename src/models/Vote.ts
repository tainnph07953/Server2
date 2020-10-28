import mongoose,{Schema,model} from 'mongoose'


export interface Vote extends mongoose.Document{
    tenMonAn:string,
    tenShop: string,
    diaChi: string,
    gioMoCua: string,
    Anh: string,
    like: string
}

const VoteSchema = new Schema(
    {
        tenMonAn: String,
        tenShop: String,
        diaChi: String,
        gioMoCua: String,
        Anh: String,
        like: String
    }
);

export default model<Vote>('Vote', VoteSchema,"votes")
