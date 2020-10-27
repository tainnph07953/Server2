import {Router} from "express";
const router: Router= Router()
import {notEnoughProductController} from '../controllers/notEnoughProductController'

router.get('/', notEnoughProductController.index)
router.get('/update/:id', notEnoughProductController.update)

export default router