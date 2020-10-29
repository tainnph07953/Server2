import {Router} from 'express'

const router: Router = Router();
import {lisVoteController} from "../controllers/listVoteController";

router.get('/',lisVoteController.index)
router.get('/delete/:id',lisVoteController.delete)


export default router
