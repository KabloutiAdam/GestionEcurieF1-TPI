const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

console.log("⚙️ Lancement du backend...");
const app = express();
const isProduction = process.env.NODE_ENV === "production";


console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("isProduction =", isProduction);

app.use(cors());
app.use(express.json());

// API routes
const driverRoutes = require("./routes/drivers")
const teamRoutes = require("./routes/teams")
const authRoutes = require("./routes/auth");
const countryRoutes = require("./routes/country")
const trackRoutes = require("./routes/tracks")




app.use("/api/drivers", driverRoutes);
app.use("/api/teams", teamRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/tracks", trackRoutes)



if (isProduction) {
  console.log("Server is running in production mode")
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
  console.log("Chemin dist absolu:", path.join(__dirname, "../dist"));
  app.get("/*", (req, res, next) => {
    try {
      // Ignore les requêtes complètement malformées
      if (req.originalUrl.startsWith("http")) {
        console.warn("URL ignorée (malformée) :", req.originalUrl);
        return next();
      }
      res.sendFile(path.join(distPath, "index.html"));
    } catch (err) {
      console.error("Erreur dans la route catch-all:", err);
      res.status(500).send("Erreur serveur.");
    }
  });

}





// Lancer le serveur
const PORT = process.env.PORT || 3040;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur Express prêt sur http://localhost:${PORT}`);
});
