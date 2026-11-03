const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    namaAlbum: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    _id: false
  }
);

const tiketSchema = new mongoose.Schema(
  {
    namaPembeli: {
      type: String,
      required: true,
      trim: true
    },
    harga: {
      type: Number,
      ref: "Artist",
      required: true,
      min: 0
    },
    kelas: {
      type: String,
      required: true,
      trim: true,
    },
    kontak: {
      type: String,
      required: true,
    },
    konserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Konser",
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

const Tiket = mongoose.model("Tiket", tiketSchema);

module.exports = Tiket;