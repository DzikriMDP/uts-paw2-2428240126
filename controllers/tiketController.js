
const mongoose = require("mongoose");
const Tiket = require("../models/tiketModel");

// Mengambil semua lagu dengan filter, pagination, sorting, dan projection
const getAlltikets = async (req, res, next) => {
  try {
    const {
      artis,
      page = 1,
      limit = 10,
      sort = "-createdAt",
      fields
    } = req.query;

    const filter = {};

    // Filter berdasarkan nama artis
    if (artis) {
      const artist = await Artist.findOne({
        namaArtis: {
          $regex: artis,
          $options: "i"
        }
      });

      if (!artist) {
        return res.status(200).json({
          message: "Data lagu tidak ditemukan",
          data: [],
          pagination: {
            page: Number(page),
            limit: Number(limit),
            totalData: 0,
            totalPages: 0
          }
        });
      }

      filter.artisId = artist._id;
    }

    // Validasi pagination
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const dataLimit = Math.min(
      Math.max(parseInt(limit, 10) || 10, 1),
      100
    );

    const skip = (currentPage - 1) * dataLimit;

    // Sorting hanya menggunakan field yang diizinkan
    const allowedSortFields = [
      "judul",
      "tahunRilis",
      "durasiDetik",
      "createdAt"
    ];

    let sortQuery = {};
    const sortFields = sort.split(",");

    sortFields.forEach((field) => {
      const sortField = field.startsWith("-")
        ? field.substring(1)
        : field;

      if (allowedSortFields.includes(sortField)) {
        sortQuery[sortField] = field.startsWith("-") ? -1 : 1;
      }
    });

    if (Object.keys(sortQuery).length === 0) {
      sortQuery = { createdAt: -1 };
    }

    // Projection hanya menggunakan field yang diizinkan
    const allowedFields = [
      "judul",
      "artisId",
      "album",
      "tahunRilis",
      "durasiDetik",
      "createdAt",
      "updatedAt"
    ];

    let projection = {};

    if (fields) {
      fields.split(",").forEach((field) => {
        if (allowedFields.includes(field)) {
          projection[field] = 1;
        }
      });

      // Tetap sertakan artisId agar populate dapat bekerja
      projection.artisId = 1;
    }

    const tikets = await Tiket.find(filter)
      .select(projection)
      .populate("artisId", "namaArtis genre deskripsi")
      .sort(sortQuery)
      .skip(skip)
      .limit(dataLimit);

    const totalData = await Tiket.countDocuments(filter);

    res.status(200).json({
      message: "Berhasil mengambil data lagu",
      data: tikets,
      pagination: {
        page: currentPage,
        limit: dataLimit,
        totalData,
        totalPages: Math.ceil(totalData / dataLimit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Mengambil satu lagu berdasarkan ID
const getTiketById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID lagu tidak valid"
      });
    }

    const Tiket = await Tiket.findById(id)
      .populate("artisId", "namaArtis genre deskripsi");

    if (!Tiket) {
      return res.status(404).json({
        message: "Data lagu tidak ditemukan"
      });
    }

    res.status(200).json({
      message: "Berhasil mengambil detail lagu",
      data: Tiket
    });
  } catch (error) {
    next(error);
  }
};

// Membuat lagu baru
const createTiket = async (req, res, next) => {
  try {
    const {
      judul,
      artis,
      artisId,
      album,
      tahunRilis,
      durasiDetik
    } = req.body;

    if (!judul || (!artis && !artisId) || !album ||
        tahunRilis === undefined || durasiDetik === undefined) {
      return res.status(400).json({
        message: "judul, artis/artisId, album, tahunRilis, dan durasiDetik wajib diisi"
      });
    }

    let artist;

    // Mencari artis berdasarkan ID atau nama
    if (artisId) {
      if (!mongoose.Types.ObjectId.isValid(artisId)) {
        return res.status(400).json({
          message: "ID artis tidak valid"
        });
      }

      artist = await Artist.findById(artisId);
    } else {
      artist = await Artist.findOne({
        namaArtis: artis
      });
    }

    if (!artist) {
      return res.status(404).json({
        message: "Data artis tidak ditemukan. Buat data artis terlebih dahulu."
      });
    }

    const albumData = typeof album === "string"
      ? { namaAlbum: album }
      : album;

    const newTiket = await Tiket.create({
      judul,
      artisId: artist._id,
      album: albumData,
      tahunRilis,
      durasiDetik
    });

    const savedTiket = await Tiket.findById(newTiket._id)
      .populate("artisId", "namaArtis genre deskripsi");

    res.status(201).json({
      message: "Lagu berhasil ditambahkan",
      data: savedTiket
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlltikets,
  getTiketById,
  createTiket
};