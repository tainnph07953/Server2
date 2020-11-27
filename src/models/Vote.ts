import mongoose, {Schema, model} from 'mongoose'


export interface Vote extends mongoose.Document {
    tenMonAn: string,
    tenCuaHang: string,
    xaPhuong: string,
    quanHuyen: string,
    thanhPho: string,
    tenDuong: string,
    c: string,
    gioDongCua: string,
    nameImage: [string],
    like: number,
    dislike: number,
    userLiked:string,
}

const VoteSchema = new Schema(
    {
        tenMonAn: String,
        tenCuaHang: String,
        xaPhuong: String,
        quanHuyen: String,
        thanhPho: String,
        tenDuong: String,
        gioMoCua: String,
        gioDongCua: String,
        nameImage: [String],
        like: Number,
        dislike: Number,
        userLiked:String,
    }
);

export default model<Vote>('Vote', VoteSchema, "votes")
