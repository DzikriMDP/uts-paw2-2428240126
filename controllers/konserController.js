const Konser = require("../models/konserModel");

const createKonser = async (req, res, next) => {
  try {
    const { kode, nama } = req.body;

    const konser = await Konser.create({
      kode,
      nama
    });

    return res.status(201).json({
      message: "Data konser berhasil ditambahkan",
      data: konser
    });
  } catch (error) {
    return next(error);
  }
};

// GET /konser - mengambil seluruh data konser
const getAllKonser = async (req, res, next) => {
  try {
    const konser = await Konser.find().sort({
      kode: 1
    });

    return res.status(200).json({
      message: "Berhasil mengambil data konser",
      data: konser
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createKonser,
  getAllKonser
};