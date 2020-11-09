import mongoose,{Schema,model} from 'mongoose'


export interface Vote extends mongoose.Document{
    tenMonAn:string,
    tenCuaHang: string,
    diaChi: string,
    gioMoCua: string,
    gioDongCua: string,
    nameImage: string,
    like: number,
    dislike: number
}

const VoteSchema = new Schema(
    {
        tenMonAn: String,
        tenCuaHang: String,
        diaChi: String,
        gioMoCua: String,
        gioDongCua: String,
        nameImage: String,
        like: Number,
        dislike: Number,
    }
);

export default model<Vote>('Vote', VoteSchema,"votes")
