import {Router} from "express";
const router: Router= Router()

import {apiController} from "../controllers/apiController";

router.get('/getAllProduct', apiController.getAllProduct)
router.get('/Rating', apiController.getAllFavorite)
router.get('/getAllCustomer', apiController.getAllCustomer)
router.post('/createCustomer', apiController.createCustomer)
router.post('/createOrderDetail', apiController.createOrderDetail)
router.post('/getOrderByID', apiController.getOrderByID)
router.post('/deleteOrderDetail', apiController.deleteOrderDetail)
router.post('/updateAmountOderDetail', apiController.updateAmountOderDetail)
router.post('/updateOder', apiController.updateOder)
router.post('/getOrderStatus', apiController.getOrderStatus)
router.post('/getOrderIsSend', apiController.getOrderIsSend)
router.post('/getVote', apiController.getAllVote)
router.post('/getInformation', apiController.getAllInformation)
router.post('/updateLike', apiController.updateLike)

router.post('/signupuser', apiController.signupuser)
router.post('/signinuser', apiController.signinuser)

router.post('/changePassword', apiController.UpdatePassword)
router.post('/information', apiController.Information)

export default router
