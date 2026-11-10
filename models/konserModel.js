const mongoose = require("mongoose");

const konserSchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      required: [true, "Kode konser wajib diisi"],
      unique: true,
      trim: true,
      uppercase: true
    },
    nama: {
      type: String,
      required: [true, "Nama konser wajib diisi"],
      trim: true
    }
  },
  {
    versionKey: false
  }
);

const Konser = mongoose.model("Konser", konserSchema);

module.exports = Konser;