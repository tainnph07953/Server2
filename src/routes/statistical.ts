import {Router} from 'express'

const router: Router = Router()
import {statisticalController} from "../controllers/statisticalController";

router.get('/', statisticalController.index)

export default router