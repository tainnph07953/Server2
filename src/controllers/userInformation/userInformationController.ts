import {Request, Response} from 'express'
import multer from "multer";
import UserInformationModel,{userInformation} from "../../models/userMobile/userInformation";
let nameImage: string=''

const storage = multer.diskStorage({
    destination(req: Request, file, callback) {
        callback(null, './src/public/uploads');
    },
    filename(req: Request, file, callback) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPE|png|PNG)$/)) {
            return callback(new Error('Sai dinh dang'), "");
        }
        const newNameFile = `${Date.now()}-tainnph07953-${file.originalname}`
        nameImage=newNameFile;
        callback(null, newNameFile);
    }
});

class UserInformationController {
    public index(request: Request, response: Response) {
        response.render('userInformation/add_userInformation.hbs', {title: 'Cập nhật thông tin'})
    }

    public async uploadInformation(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage}).array('image',10);
        upload(request, response, (err) => {
            if (err) {
                response.send(err)
                return
            }
            // tslint:disable-next-line:no-shadowed-variable
            const userInformation: userInformation = new UserInformationModel({
                userName: request.body.username,
                appetite: request.body.appetite,
                image: 'uploads/'+nameImage
            })
            userInformation.save();
            nameImage=''
            response.redirect('/information')
        })
    }
}

export const userInformationController = new UserInformationController()
