import {Router} from 'express'

const router: Router = Router();
import {listProductController} from "../controllers/listProductController";

router.get('/',listProductController.index)
router.get('/delete/:id',listProductController.delete)
router.post('/update',listProductController.update)


export default router