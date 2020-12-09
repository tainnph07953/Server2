    import mongoose,{Schema,model} from 'mongoose'

export interface User extends mongoose.Document{
    userName:string,
    password: string,
}

const UserSchema= new Schema(
    {
        userName: String,
        password: String,
    }
);

export default model<User>('User', UserSchema,"users")
