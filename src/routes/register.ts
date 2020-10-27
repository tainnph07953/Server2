import {Router} from 'express'

const router: Router = Router()

import {registerController} from '../controllers/registerController'

router.get('/', registerController.index)
router.post('/', registerController.onRegister)

export default router