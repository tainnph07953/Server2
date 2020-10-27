import {Router} from "express";
const router: Router= Router()
import {orderController} from "../controllers/orderController";

router.get('/', orderController.index)
router.get('/update/:id', orderController.update)


export default router