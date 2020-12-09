import {Router} from 'express'

const router: Router = Router();
import {lisVoteController} from "../controllers/listVoteController";
import {listProductController} from "../controllers/listProductController";
import {addVoteController} from "../controllers/addVoteController";


router.get('/',lisVoteController.index)
router.get('/delete/:id',lisVoteController.delete)
router.post('/like',lisVoteController.updateLike)
router.post('/dislike',lisVoteController.updateDisLike)
router.post('/comment',lisVoteController.apiComment)
export default router
