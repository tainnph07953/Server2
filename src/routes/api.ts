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

export default router
