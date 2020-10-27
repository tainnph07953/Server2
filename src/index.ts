import express from 'express'
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
import {allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access";
import {addVoteController} from "./controllers/addVoteController";
// Initializations
const app = express();
import ('./database')

// Setting
app.set('port', process.env.PORT || 7000);
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
app.use('/home', HomeRouter)
app.use('/register',RegisterRouter)
app.use('/customer',CustomerRouter)
app.use('/product',ProductRouter)
app.use('/add_product',AddProductRouter)
app.use('/statistical', StatisticalRouter)
app.use('/favorite',FavoriteRouter)
app.use('/order', OrderRouter)
app.use('/not_enough_product', NotEnoughProductRouter)
app.use('/vote', )
app.use('/api', ApiRouter)


// Static file

app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    // tslint:disable-next-line:no-console
    console.log(`Hello ${app.get('port')}`);
});
