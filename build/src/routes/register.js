"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const registerController_1 = require("../controllers/registerController");
router.get('/', registerController_1.registerController.index);
router.post('/', registerController_1.registerController.onRegister);
exports.default = router;
