import mongoose, {Schema, model} from 'mongoose'


export interface Vote extends mongoose.Document {
    tenMonAn: string,
    tenCuaHang: string,
    xaPhuong: string,
    quanHuyen: string,
    thanhPho: string,
    tenDuong: string,
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
        xaPhuong: String,
        quanHuyen: String,
        thanhPho: String,
        tenDuong: String,
        gioMoCua: String,
        gioDongCua: String,
        nameImage: String,
        like: Number,
        dislike: Number,
    }
);

export default model<Vote>('Vote', VoteSchema, "votes")
