const mongoose = require("mongoose");
const Tiket = require("../models/tiketModel");
const Konser = require("../models/konserModel");

const fieldProjection = "_id kodeTiket namaPembeli harga kelas";

// POST /tiket - membuat data tiket utama
const createTiket = async (req, res, next) => {
  try {
    const {
      kodeTiket,
      namaPembeli,
      harga,
      kelas,
      kontak,
      konserId
    } = req.body;

    // Memeriksa format ID konser.
    if (konserId && !mongoose.Types.ObjectId.isValid(konserId)) {
      const error = new Error("ID konser tidak valid");
      error.status = 400;
      return next(error);
    }

    // Memastikan konser yang dipilih tersedia.
    if (konserId) {
      const konser = await Konser.findById(konserId);

      if (!konser) {
        const error = new Error("Data konser tidak ditemukan");
        error.status = 404;
        return next(error);
      }
    }

    // Hanya menerima field yang ditentukan pada topik.
    const tiket = await Tiket.create({
      kodeTiket,
      namaPembeli,
      harga,
      kelas,
      kontak,
      konserId
    });

    return res.status(201).json({
      message: "Data tiket berhasil ditambahkan",
      data: tiket
    });
  } catch (error) {
    return next(error);
  }
};

// GET /tiket dan GET /tiket?kelas=...
const getAllTiket = async (req, res, next) => {
  try {
    const filter = {};

    // Filter berdasarkan kelas tiket jika query tersedia.
    if (req.query.kelas !== undefined) {
      filter.kelas = req.query.kelas;
    }

    const tiket = await Tiket.find(filter)
      .select(fieldProjection)
      .sort({
        createdAt: -1
      });

    return res.status(200).json({
      message: "Berhasil mengambil data tiket",
      data: tiket
    });
  } catch (error) {
    return next(error);
  }
};

// GET /tiket/:id - mengambil detail tiket.
const getTiketById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Memeriksa apakah ID memiliki format ObjectId yang valid.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("ID tiket tidak valid");
      error.status = 400;
      return next(error);
    }

    // Mengambil tiket sekaligus data konser yang direferensikan.
    const tiket = await Tiket.findById(id).populate(
      "konserId",
      "kode nama"
    );

    if (!tiket) {
      const error = new Error("Data tiket tidak ditemukan");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      message: "Berhasil mengambil detail tiket",
      data: tiket
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTiket,
  getAllTiket,
  getTiketById
};