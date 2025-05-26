const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();


const app = express();
const isProduction = process.env.NODE_ENV === "production";



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
 
  app.get("*", (req, res, next) => {
  try {
    const url = req.originalUrl;
  
    if (url.startsWith("http") || url.includes("://") || url.includes("..")) {
    
      return res.status(400).send("URL invalide");
    }

    res.sendFile(path.join(distPath, "index.html"));
  } catch (err) {
    
    res.status(500).send("Erreur serveur.");
  }
});


}





// Lancer le serveur
const PORT = process.env.PORT || 3040;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur Express prêt sur http://localhost:${PORT}`);
});
