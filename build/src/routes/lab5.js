"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const lab5Controller_1 = require("../controllers/lab5Controller");
router.get('/', lab5Controller_1.lab5Controller.index);
router.post('/', lab5Controller_1.lab5Controller.uploadFiles);
exports.default = router;
