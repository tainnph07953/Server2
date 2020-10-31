import {Request, Response} from 'express'
import multer from "multer";
import VoteModel, {Vote} from '../models/Vote'
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

class AddVoteController {
    public index(request: Request, response: Response) {
        response.render('vote/add_Vote', {title: 'Thêm món ăn'})
    }

    public async uploadInformation(request: Request, response: Response): Promise<void> {
        const upload = await multer({storage}).array('Anh',10)
        upload(request, response, (err) => {
            if (err) {
                response.send(err)
                return
            }
            const vote: Vote = new VoteModel({
                tenMonAn: request.body.tenMonAn,
                tenCuahang: request.body.tenCuahang,
                diaChi: request.body.diaChi,
                gioMoCua: request.body.gioMoCua,
                nameImage: 'uploads/'+nameImage,
                like: request.body.like
            })
            vote.save();
            nameImage=''
            response.redirect('vote')
        })
    }
}

export const addVoteController = new AddVoteController();
