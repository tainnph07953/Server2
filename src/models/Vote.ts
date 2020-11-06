import mongoose,{Schema,model} from 'mongoose'


export interface Vote extends mongoose.Document{
    tenMonAn:string,
    tenCuaHang: string,
    diaChi: string,
    gioMoCua: string,
    gioDongCua: string,
    nameImage: string,
    like: string
}

const VoteSchema = new Schema(
    {
        tenMonAn: String,
        tenCuaHang: String,
        diaChi: String,
        gioMoCua: String,
        gioDongCua: String,
        nameImage: String,
        like: String
    }
);

export default model<Vote>('Vote', VoteSchema,"votes")
