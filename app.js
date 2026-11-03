require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const tiketRoutes = require("./routes/tiketRoutes");

const logger = require("./middlewares/logger");
const cekApiKey = require("./middlewares/cekApiKey.js");

const {
  notFound,
  errorHandler
} = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*"
  })
);

app.use(express.json());
app.use(logger);

// Halaman utama API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "RESTful API Lagu",
    nama: "Dzikri Cahayadi Alamsyah",
    nim: "2428240126",
    topik: 15,
    kategori: "Musik",
    resource: "Lagu",
    endpoints: {
      getAllSongs: "GET /songs",
      getSongById: "GET /songs/:id",
      filterByArtist: "GET /songs?artis=Senandung",
      createSong: "POST /songs",
      updateSong: "PUT /songs/:id",
      deleteSong: "DELETE /songs/:id",

      getAllArtists: "GET /artists",
      getArtistById: "GET /artists/:id",
      createArtist: "POST /artists",
      updateArtist: "PUT /artists/:id",
      deleteArtist: "DELETE /artists/:id"
    }
  });
});

// Route tiket
app.use(
  "/tikets",
  cekApiKey,
  tiketRoutes
);

// Middleware 404 dan error handler
app.use(notFound);
app.use(errorHandler);

// Koneksi MongoDB dan menjalankan server
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Berhasil terhubung ke MongoDB");

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "Gagal terhubung ke MongoDB:",
      error.message
    );
  });

module.exports = app;