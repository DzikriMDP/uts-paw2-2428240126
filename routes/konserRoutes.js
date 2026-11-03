const express = require("express");
const router = express.Router();

const {
  getAllKonsers,
  getKonserById,
  createKonser,
  updateKonser,
  deleteKonser
} = require("../controllers/konserController");

router.get("/", getAllKonsers);
router.get("/:id", getKonserById);
router.post("/", createKonser);
router.put("/:id", updateKonser);
router.delete("/:id", deleteKonser);

module.exports = router;