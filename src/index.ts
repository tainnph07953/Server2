import express, {Request, Response} from 'express'
import hbs from 'express-handlebars'
import path from 'path'


// Importing Routes
import IndexRouter from './routes'
import LoginRouter from './routes/login'
import HomeRouter from './routes/home'
import RegisterRouter from './routes/register'
import CustomerRouter from './routes/customer'
import ProductRouter from './routes/product'
import AddProductRouter from './routes/add_product'
import StatisticalRouter from './routes/statistical'
import OrderRouter from './routes/order'
import NotEnoughProductRouter from './routes/not_enough_product'
import FavoriteRouter from './routes/favorite'
import ApiRouter from './routes/api'
import AddVote from './routes/add_vote'
import VoteRouter from "./routes/vote";
import AddInformation from "./routes/add_information";
import InformationRouter from "./routes/information";
import {addVoteController} from "./controllers/addVoteController";
import Admin, {usermobile} from "./models/userMobile/userMobile";
import product, {Product} from "./models/Product";
import VoteData, {Vote} from "./models/Vote";
import multer from "multer";
// Initializations
const app = express();
import ('./database');
// @ts-ignore
import databases from './database';

// Setting
app.set('port', process.env.PORT || 8100);
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
app.use(express.urlencoded({extended: false}));


// Routes
app.use('/', IndexRouter)
app.use('/login', LoginRouter)
app.use('/product', ProductRouter)
app.use('/home', HomeRouter)
app.use('/register', RegisterRouter)
app.use('/customer', CustomerRouter)
app.use('/add_product', AddProductRouter)
app.use('/statistical', StatisticalRouter)
app.use('/favorite', FavoriteRouter)
app.use('/order', OrderRouter)
app.use('/not_enough_product', NotEnoughProductRouter)
app.use('/add_vote', AddVote)
app.use('/vote', VoteRouter)
app.use('/add_userInformation', AddInformation)
app.use('/information', InformationRouter)
app.use('/api', ApiRouter)


// Static file

app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    // tslint:disable-next-line:no-console
    console.log(`Hello ${app.get('port')}`);
});


app.post('/food', async (req: Request, res: Response) => {
    const foodter = {
        name: req.body.name,
        price: req.body.price,
        urlImage: req.body.urlImage,
        amount: req.body.amount,
        brand: req.body.brand,
        size: req.body.size
    };
    const fooddata = await product.find({brand: req.body.brand});
    if (fooddata.length === 0) {
        const foods = await product.create(foodter)
        try {
            res.send({status: true, foodter: foods});
        } catch (e) {
            res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
        }
    } else {
        res.send({status: false, msg: "Cửa hàng đã tồn tại"});
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
    const userdata = await Admin.find({userName: req.body.userName});
    if (userdata.length === 0) {
        const users = await Admin.create(user)
        try {
            res.send({status: true, user: users});
        } catch (e) {
            res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
        }
    } else {
        res.send({status: false, msg: "user đã tồn tại"});
        // tslint:disable-next-line:no-console
        console.log('User da ton tai')
    }


});
app.post('/signinuser', async (req: Request, res: Response) => {
    const user = {
        userName: req.body.userName,
        password: req.body.password
    };

    const userdata = await Admin.find({userName: req.body.userName, password: req.body.password});
    if (userdata.length === 0) {
        // tslint:disable-next-line:no-console
        console.log('Đăng nhập không thành công')

    } else {
        // console.log(user);
        try {
            res.send({status: true, msg: ""});
        } catch (e) {
            res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
        }
    }
});
