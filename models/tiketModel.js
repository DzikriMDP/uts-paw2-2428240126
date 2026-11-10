const mongoose = require("mongoose");

const kontakSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email kontak wajib diisi"],
      trim: true
    },
    telepon: {
      type: String,
      required: [true, "Nomor telepon wajib diisi"],
      trim: true
    }
  },
  {
    _id: false
  }
);

const tiketSchema = new mongoose.Schema(
  {
    kodeTiket: {
      type: String,
      required: [true, "Kode tiket wajib diisi"],
      unique: true,
      trim: true
    },
    namaPembeli: {
      type: String,
      required: [true, "Nama pembeli wajib diisi"],
      trim: true
    },
    harga: {
      type: Number,
      required: [true, "Harga tiket wajib diisi"],
      min: [0, "Harga minimal 0"]
    },
    kelas: {
      type: String,
      required: [true, "Kelas tiket wajib diisi"],
      trim: true
    },
    kontak: {
      type: kontakSchema,
      required: [true, "Kontak pembeli wajib diisi"]
    },
    konserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Konser",
      required: [true, "Konser wajib dipilih"]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

const Tiket = mongoose.model("Tiket", tiketSchema);

module.exports = Tiket;