// @ts-ignore
import mongoose, {Schema,model} from "mongoose";

// tslint:disable-next-line:class-name
export interface userInformation extends mongoose.Document{
    image: string,
    userName:string,
    appetite: string,
}

const UserInformation= new Schema(
    {
        image: String,
        userName: String,
        appetite: String
    }
);
export default model<userInformation>('UserInformation', UserInformation,"UserInformations")
