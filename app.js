require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const konserRoutes = require("./routes/konserRoutes");
const tiketRoutes = require("./routes/tiketRoutes");

const {
  notFoundHandler,
  errorHandler
} = require("./middlewares/errorHandler");
const logger = require('./middlewares/logger');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Endpoint utama API.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "RESTful API Tiket Konser",
    nama: "Dzikri Cahayadi Alamsyah",
    npm: "2428240126",
    topik: 15,
    kategori: "Tiket Konser",
    endpoints: {
      konser: {
        create: "POST /konser",
        getAll: "GET /konser"
      },
      tiket: {
        create: "POST /tiket",
        getAll: "GET /tiket",
        filter: "GET /tiket?kelas=tribun",
        projection: "GET /tiket",
        getById: "GET /tiket/:id"
      }
    }
  });
});

// Menghubungkan routes dengan endpoint.
app.use("/konser", konserRoutes);
app.use("/tiket", tiketRoutes);

// Middleware penanganan error diletakkan paling akhir.
app.use(notFoundHandler);
app.use(errorHandler);

// Konfigurasi server dan DB.
const DB_URI = process.env.DB_URI;

// Menjalankan server setelah koneksi database berhasil.
async function startServer() {
  try {
    if (!DB_URI) {
      throw new Error(
        "DB_URI belum diatur pada file .env"
      );
    }

    await mongoose.connect(DB_URI);

    console.log("Berhasil terhubung ke DB");

    app.listen(PORT, () => {
      console.log(
        `Server berjalan di http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Gagal terhubung ke DB:",
      error.message
    );

    process.exit(1);
  }
}

// Menjalankan server hanya ketika app.js dijalankan langsung.
if (require.main === module) {
  startServer();
}

module.exports = app;