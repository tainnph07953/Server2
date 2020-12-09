import {Router} from "express";

const router: Router= Router()

import {addProductController} from "../controllers/addProductController";
router.get('/',addProductController.index)
router.post('/',addProductController.uploadInformation)

export default router