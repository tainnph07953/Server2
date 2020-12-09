import express, { NextFunction, Request, Response } from 'express'
import hbs from 'express-handlebars'
import path from 'path'
import product from "./models/Product"
import { default as Admin, default as userMobile } from "./models/userMobile/userMobile"
// Importing Routes
import IndexRouter from './routes'
import AddInformation from "./routes/add_information"
import AddProductRouter from './routes/add_product'
import AddVote from './routes/add_vote'
import ApiRouter from './routes/api'
import FavoriteRouter from './routes/favorite'
import HomeRouter from './routes/home'
import InformationRouter from "./routes/information"
import LoginRouter from './routes/login'
import ProductRouter from './routes/product'
import RegisterRouter from './routes/register'
import VoteRouter from "./routes/vote"
const PORT : string|number = process.env.PORT || 5000;
// Initializations
const app = express();
import('./database');

// Setting
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers'),
    defaultLayout: 'main',
}));
app.set('view engine', '.hbs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/', IndexRouter)
app.use('/login', LoginRouter)
app.use('/product', ProductRouter)
app.use('/home', HomeRouter)
app.use('/register', RegisterRouter)
app.use('/add_product', AddProductRouter)
app.use('/favorite', FavoriteRouter)
app.use('/add_vote', AddVote)
app.use('/vote', VoteRouter)
app.use('/add_userInformation', AddInformation)
app.use('/information', InformationRouter)
app.use('/api', ApiRouter)


// Static file

app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(PORT);

app.post('/food', async (req: Request, res: Response) => {
    const foodter = {
        name: req.body.name,
        price: req.body.price,
        urlImage: req.body.urlImage,
        amount: req.body.amount,
        brand: req.body.brand,
        size: req.body.size
    };
    const fooddata = await product.find({ brand: req.body.brand });
    if (fooddata.length === 0) {
        const foods = await product.create(foodter)
        try {
            res.send({ status: true, foodter: foods });
        } catch (e) {
            res.send({ status: false, msg: 'Co loi xay ra: ' + e.message })
        }
    } else {
        res.send({ status: false, msg: "Cửa hàng đã tồn tại" });
        // tslint:disable-next-line:no-console
        console.log('Cửa hàng da ton tai')
    }
});

app.post('/signupuser', async (req: Request, res: Response) => {
    const user = {
        userName: req.body.userName,
        password: req.body.password
    };
    // console.log(user);
    const userdata = await Admin.find({ userName: req.body.userName });
    if (userdata.length === 0) {
        const users = await Admin.create(user)
        try {
            res.send({ status: true, user: users });
        } catch (e) {
            res.send({ status: false, msg: 'Co loi xay ra: ' + e.message })
        }
    } else {
        res.send({ status: false, msg: "user đã tồn tại" });
        // tslint:disable-next-line:no-console
        console.log('User da ton tai')
    }

});
// app.post('/updatePassword', async (req: Request,res: Response)=>{
//     const id = req.params.id;
//     const user = req.body;
//     const options = {new: true};
//     UserInformationModel.findByIdAndUpdate(id, user, (err: any, book: any)=>{
//         if (err){
//             res.send(err);
//         }else {
//             res.send("thanhcong");
//         }
//     })
// })
app.post('/signinuser', async (req: Request, res: Response) => {
    const user = {
        userName: req.body.userName,
        password: req.body.password
    };

    const userdata = await Admin.find({ userName: req.body.userName, password: req.body.password });
    if (userdata.length === 0) {
        // tslint:disable-next-line:no-console
        console.log('Đăng nhập không thành công')

    } else {
        // console.log(user);
        try {
            res.send({ status: true, msg: "" });
        } catch (e) {
            res.send({ status: false, msg: 'Co loi xay ra: ' + e.message })
        }
    }
});
app.post('/updatee', async (req: Request, res: Response, next: NextFunction) => {
    const userName = req.params.userName;
    const password = req.body.password;
    await userMobile.findOneAndUpdate({ "userName": userName }, { "password": password });
    res.end();
});