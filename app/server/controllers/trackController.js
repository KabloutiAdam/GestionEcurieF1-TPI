const db = require('../db')

exports.getAllTracks = async (req, res) => {

    let baseQuery = `
        SELECT idTrack as id, traName as name, traLength as length, traOrder as trackOrder, traImageLink as pictureLink, fkCountry as country
        FROM t_tracks
         `;

    let params = [];

    db.all(baseQuery, params, (err, rows) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(rows);
    });
}