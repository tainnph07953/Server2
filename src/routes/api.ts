import {Router} from "express";
const router: Router= Router()

import {apiController} from "../controllers/apiController";

router.post('/getVote', apiController.getAllVote)
router.post('/signupuser', apiController.signupuser)
router.post('/signinuser', apiController.signinuser)
router.post('/changPassword',apiController.UpdatePassword)


export default router
