"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const homeController_1 = require("../controllers/homeController");
router.get('/', homeController_1.homeController.index);
exports.default = router;
