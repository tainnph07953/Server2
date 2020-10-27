import {Router} from 'express'

const router: Router = Router()
import {loginController} from "../controllers/loginController";


router.get('/',loginController.index)
router.post('/', loginController.onLogin)

export default router