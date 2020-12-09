"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const orderController_1 = require("../controllers/orderController");
router.get('/', orderController_1.orderController.index);
router.get('/update/:id', orderController_1.orderController.update);
exports.default = router;
