import mongoose from 'mongoose'
import {mongodb} from "./key";

mongoose.connect(mongodb.URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
// tslint:disable-next-line:no-console
}).then(db=>console.log('Kết nối mongoDB thành công')).catch(err=>console.log(err))