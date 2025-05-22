const db = require('../db')

exports.getAllTracks = async (req, res) => {

    let baseQuery = `
        SELECT idTrack as id, traName as name, traLength as length, traOrder as trackOrder, traImageLink as pictureLink, fkCountry as country, couLogoLink as trackCountryPicture
        FROM t_tracks t
        LEFT JOIN t_country c ON c.idCountry = t.fkCountry
        ORDER BY traOrder ASC
        LIMIT 5;
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