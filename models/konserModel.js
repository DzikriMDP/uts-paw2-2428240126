const mongoose = require("mongoose");

const KonserSchema = new mongoose.Schema(
  {
    namaArtis: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      trim: true
    },
    deskripsi: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Konser = mongoose.model("Konser", konserSchema);

module.exports = Konser;