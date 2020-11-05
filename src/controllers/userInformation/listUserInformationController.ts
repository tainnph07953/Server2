import {Request, Response} from 'express'
import UserInformationModel,{userInformation} from "../../models/userMobile/userInformation";
import multer from "multer";

let nameImage: string = '';
const storage = multer.diskStorage({

    destination(req: Request, file, callback) {
        callback(null, './src/public/uploads');
    },
    filename(req: Request, file, callback) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG)$/)) {
            return callback(new Error('Sai dinh dang'), "");
        }
        const newNameFile = `${Date.now()}-tainnph07953-${file.originalname}`
        nameImage = newNameFile;
        callback(null, newNameFile);
    }
});

class ListUserInformationController{
    public async index(request: Request, response: Response): Promise<void> {
        const listInformation = await UserInformationModel.find().lean()
        response.render('userInformation/list_information', {listInformation, title: 'Danh sách thông tin người dùng'})
    }

    public async delete(request: Request, response: Response): Promise<void> {
        // tslint:disable-next-line:only-arrow-functions
        await UserInformationModel.findByIdAndDelete(request.params.id, (err => {
            if (err) {
                // tslint:disable-next-line:no-console
                response.send(err)
            } else {
                response.redirect('/information')
            }
        }))
    }

    public async update(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage}).single('image')
        upload(request, response, (err) => {
            if (err) {
                response.send(err)
                return
            }

            if (nameImage.toString() === "") {
                UserInformationModel.findByIdAndUpdate(request.body.id,
                    {
                        userName: request.body.usernameUpdate,
                        appetite: request.body.appetiteUpdate,
                        // tslint:disable-next-line:no-shadowed-variable
                    }, err => {
                        if (err) {
                            // tslint:disable-next-line:no-console
                            response.send(err)
                        } else {
                            response.redirect('/information')
                        }
                    }
                )

            } else {
                UserInformationModel.findByIdAndUpdate(request.body.id,
                    {
                        userName: request.body.usernameUpdate,
                        appetite: request.body.appetiteUpdate,
                        image: 'uploads/' + nameImage
                        // tslint:disable-next-line:no-shadowed-variable
                    }, err => {
                        if (err) {
                            // tslint:disable-next-line:no-console
                            response.send(err)
                        } else {
                            response.redirect('/information')
                        }
                    }
                )
            }
            nameImage = ''
        })

    }
}

export const listUserInformationController = new ListUserInformationController()
