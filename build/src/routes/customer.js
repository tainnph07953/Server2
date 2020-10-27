"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const customerController_1 = require("../controllers/customerController");
router.get('/', customerController_1.customerController.index);
exports.default = router;
