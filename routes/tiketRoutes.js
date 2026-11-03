const express = require("express");
const router = express.Router();

const {
  getAllTikets,
  getTiketById,
  createTiket,
  updateTiket,
  deleteTiket
} = require("../controllers/tiketController");

// GET semua Tiket
router.get("/", getAllTikets);

// GET detail Tiket berdasarkan ID
router.get("/:id", getTiketById);

// POST menambahkan Tiket
router.post("/", createTiket);

// PUT memperbarui Tiket
router.put("/:id", updateTiket);

// DELETE menghapus Tiket
router.delete("/:id", deleteTiket);

module.exports = router;