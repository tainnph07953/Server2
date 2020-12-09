"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const login_1 = __importDefault(require("./routes/login"));
const home_1 = __importDefault(require("./routes/home"));
const register_1 = __importDefault(require("./routes/register"));
const lab5_1 = __importDefault(require("./routes/lab5"));
const customer_1 = __importDefault(require("./routes/customer"));
const product_1 = __importDefault(require("./routes/product"));
const add_product_1 = __importDefault(require("./routes/add_product"));
const statistical_1 = __importDefault(require("./routes/statistical"));
const order_1 = __importDefault(require("./routes/order"));
const not_enough_product_1 = __importDefault(require("./routes/not_enough_product"));
const app = express_1.default();
Promise.resolve().then(() => __importStar(require('./database')));
app.set('port', process.env.PORT || 5000);
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('.hbs', express_handlebars_1.default({
    extname: '.hbs',
    layoutsDir: path_1.default.join(app.get('views'), 'layouts'),
    partialsDir: path_1.default.join(app.get('views'), 'partials'),
    helpers: require('./lib/helpers'),
    defaultLayout: 'main',
}));
app.set('view engine', '.hbs');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', routes_1.default);
app.use('/login', login_1.default);
app.use('/home', home_1.default);
app.use('/register', register_1.default);
app.use('/upload_image', lab5_1.default);
app.use('/customer', customer_1.default);
app.use('/product', product_1.default);
app.use('/add_product', add_product_1.default);
app.use('/statistical', statistical_1.default);
app.use('/order', order_1.default);
app.use('/not_enough_product', not_enough_product_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
