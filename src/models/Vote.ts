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
    like: [string],
    dislike: [string],
    cmt: [string],
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
        coordinate: String,
        nameImage: [String],
        like: [String],
        dislike: [String],
        cmt: [String],
        userLiked: String,
    }
);

export default model<Vote>('Vote', VoteSchema, "votes")
