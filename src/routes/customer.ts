import {Router} from "express";

const router: Router= Router()

import {customerController} from "../controllers/customerController";
router.get('/',customerController.index)

export default router