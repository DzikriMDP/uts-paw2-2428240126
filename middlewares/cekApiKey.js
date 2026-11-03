function cekApiKey(req, res, next) {
  if (req.method === "GET") {
    return next();
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      status: "error",
      message: "API key tidak valid atau tidak ditemukan",
      data: null
    });
  }

  next();
}

module.exports = cekApiKey;