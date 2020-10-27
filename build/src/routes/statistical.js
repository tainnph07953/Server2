"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const statisticalController_1 = require("../controllers/statisticalController");
router.get('/', statisticalController_1.statisticalController.index);
exports.default = router;
