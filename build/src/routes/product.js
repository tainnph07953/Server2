"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const listProductController_1 = require("../controllers/listProductController");
router.get('/', listProductController_1.listProductController.index);
router.get('/delete/:id', listProductController_1.listProductController.delete);
exports.default = router;
