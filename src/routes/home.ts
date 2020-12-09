import {Router} from 'express'

const router: Router = Router()
import {homeController} from "../controllers/homeController";


router.get('/', homeController.index)

export default router