"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
let listFileName = [];
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, './src/public/uploads');
    },
    filename(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG)$/)) {
            return callback(new Error('Sai dinh dang'), "");
        }
        const newNameFile = `${Date.now()}-Nambdph07444-${file.originalname}`;
        listFileName.push(newNameFile);
        callback(null, newNameFile);
    }
});
class Lab5Controller {
    index(request, response) {
        response.render('upload_image/index.hbs', { isShow: 'hidden' });
    }
    uploadFiles(request, response, nextFunction) {
        const upload = multer_1.default({ storage }).array('selectFiles', 3);
        upload(request, response, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                if (err.code.toString() === "LIMIT_UNEXPECTED_FILE") {
                    response.render('upload_image/index.hbs', {
                        status: "alert alert-danger w-100",
                        message: "Vui lòng chọn tối đa 3 file",
                        isShow: null
                    });
                    listFileName = [];
                    return;
                }
            }
            else if (err) {
                if (err.toString() === "Error: Sai dinh dang") {
                    response.render('upload_image/index.hbs', {
                        status: "alert alert-danger w-100",
                        message: "Vui lòng chọn định dạng (jpg,JPG,jpeg,JPEG)",
                        isShow: null
                    });
                    listFileName = [];
                    return;
                }
            }
            response.render('upload_image/index.hbs', {
                status: "alert alert-success w-100",
                isShow: null,
                message: "Thêm file thành công",
                listFileName
            });
            listFileName = [];
        });
    }
}
exports.lab5Controller = new Lab5Controller();
