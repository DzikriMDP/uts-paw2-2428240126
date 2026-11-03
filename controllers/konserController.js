const mongoose = require("mongoose");
const Konser = require("../models/konserModel");
const Tiket = require("../models/tiketModel");

// Mengambil semua data artis
const getAllKonsers = async (req, res, next) => {
  try {
    const konsers = await konser.find().sort({ namaKonser: 1 });

    res.status(200).json({
      message: "Berhasil mengambil data konser",
      totalData: konsers.length,
      data: konsers
    });
  } catch (error) {
    next(error);
  }
};

// Mengambil detail konser berdasarkan ID
const getkonserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID konser tidak valid"
      });
    }

    const konser = await konser.findById(id);

    if (!konser) {
      return res.status(404).json({
        message: "Data konser tidak ditemukan"
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil detail konser",
      data: konser
    });
  } catch (error) {
    next(error);
  }
};

// Menambahkan data konser
const createkonser = async (req, res, next) => {
  try {
    const { namaKonser, genre, deskripsi } = req.body;

    if (!namaKonser || !namaKonser.trim()) {
      return res.status(400).json({
        message: "Nama Konser wajib diisi"
      });
    }

    const existingkonser = await konser.findOne({
      namaKonser: {
        $regex: `^${namaKonser.trim()}$`,
        $options: "i"
      }
    });

    if (existingkonser) {
      return res.status(409).json({
        message: "Konser tersebut sudah terdaftar"
      });
    }

    const newkonser = await konser.create({
      namaKonser,
      genre,
      deskripsi
    });

    res.status(201).json({
      message: "Konser berhasil ditambahkan",
      data: newkonser
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllkonsers,
  getkonserById,
  createkonser,
};