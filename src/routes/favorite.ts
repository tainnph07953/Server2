import {Router} from 'express'

const router: Router = Router()
import {favoriteController} from "../controllers/favoriteController";

router.get('/', favoriteController.index)

export default router