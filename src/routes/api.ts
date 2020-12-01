import {Router} from "express";
const router: Router= Router()

import {apiController} from "../controllers/apiController";

router.get('/getInformation', apiController.getAllInformation)
router.get('/Rating', apiController.getAllFavorite)
router.get('/Nearlist', apiController.getAllNearlist)
router.get('/OldList', apiController.getAllOldList)
router.post('/getVote', apiController.getAllVote)
// router.post('/updateLike', apiController.updateLike)

router.post('/signupuser', apiController.signupuser)
router.post('/signinuser', apiController.signinuser)
router.post('/InforFood', apiController.InforFood)

router.post('/uploadAppetite',apiController.Updateappetite)
router.post('/changePassword', apiController.UpdatePassword)
router.get('/getCoord', apiController.getCoord)
export default router
