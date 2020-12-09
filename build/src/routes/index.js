"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const loginController_1 = require("../controllers/loginController");
router.get('/', loginController_1.loginController.index);
exports.default = router;
