require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Test-Route
app.get("/", (req, res) => {
  res.send("Backend läuft 🚀");
});

// DB-Verbindung
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB verbunden");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server läuft auf Port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ DB-Verbindungsfehler:", err));
