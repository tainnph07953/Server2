"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const addProductController_1 = require("../controllers/addProductController");
router.get('/', addProductController_1.addProductController.index);
exports.default = router;
