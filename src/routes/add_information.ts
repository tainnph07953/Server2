import {Router} from "express";

const router: Router= Router()


import {userInformationController} from "../controllers/userInformation/userInformationController";
router.get('/',userInformationController.index)
router.post('/',userInformationController.uploadInformation)

export default router
