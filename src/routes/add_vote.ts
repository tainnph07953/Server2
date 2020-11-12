import {Router} from "express";

const router: Router= Router()

import {addVoteController} from "../controllers/addVoteController";

router.get('/',addVoteController.index)
router.post('/',addVoteController.uploadInformation)

export default router
