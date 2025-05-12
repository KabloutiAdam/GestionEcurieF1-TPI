const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();
const isProduction = process.env.NODE_ENV === "production";


app.use(express.static(path.join(__dirname, "../dist")));

app.use(cors());
app.use(express.json());

// API routes
const driverRoutes = require("./routes/drivers")
const authRoutes = require("./routes/auth");
const countryRoutes = require("./routes/country")


app.use("/api/drivers", driverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/country", countryRoutes);


if (isProduction) {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}





// Lancer le serveur
const PORT = process.env.PORT || 3040;
app.listen(PORT, () => {
  console.log(`Serveur Express prêt sur http://localhost:${PORT}`);
});
