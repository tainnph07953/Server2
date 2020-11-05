import {Router} from 'express'

const router: Router = Router();
// @ts-ignore
import {listUserInformationController} from "../controllers/userInformation/listUserInformationController";

router.get('/',listUserInformationController.index)
router.get('/delete/:id',listUserInformationController.delete)
router.post('/update',listUserInformationController.update)


export default router
