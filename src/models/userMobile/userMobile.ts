// @ts-ignore
import mongoose, {Schema,model} from "mongoose";

// tslint:disable-next-line:class-name
export interface usermobile extends mongoose.Document{
    userName:string,
    password: string,
    appetite: string,
}

const UserMobile= new Schema(
    {
        userName: String,
        password: String,
        appetite: String,
    }
);
export default model<usermobile>('UserMobile', UserMobile,"UserMobiles")
