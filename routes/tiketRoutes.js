const express = require("express");
const router = express.Router();

const {
  createTiket,
  getAllTiket,
  getTiketById
} = require("../controllers/tiketController");

// POST /tiket
router.post("/", createTiket);

// GET /tiket
router.get("/", getAllTiket);

// GET /tiket/:id
router.get("/:id", getTiketById);

module.exports = router;