const express = require("express");
const router = express.Router();

const {
  createKonser,
  getAllKonser
} = require("../controllers/konserController");

router.post("/", createKonser);
router.get("/", getAllKonser);

module.exports = router;