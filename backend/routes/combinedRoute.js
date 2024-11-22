const express = require("express");
const { getCombinedData } = require("../controller/combinedController");

const router = express.Router();

router.get("/", getCombinedData);

module.exports = router;
