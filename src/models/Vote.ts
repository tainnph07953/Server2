import mongoose,{Schema,model} from 'mongoose'


export interface Vote extends mongoose.Document{
    tenMonAn:string,
    tenCuahang: string,
    diaChi: string,
    gioMoCua: string,
    nameImage: string,
    like: string
}

const VoteSchema = new Schema(
    {
        tenMonAn: String,
        tenCuahang: String,
        diaChi: String,
        gioMoCua: String,
        nameImage: String,
        like: String
    }
);

export default model<Vote>('Vote', VoteSchema,"votes")
