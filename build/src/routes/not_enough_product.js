"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const notEnoughProductController_1 = require("../controllers/notEnoughProductController");
router.get('/', notEnoughProductController_1.notEnoughProductController.index);
router.get('/update/:id', notEnoughProductController_1.notEnoughProductController.update);
exports.default = router;
