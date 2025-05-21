const db = require('../db')

exports.getAllDrivers = async (req, res) => {

    let baseQuery = `
        SELECT idDriver as id, driFirstname as firstname, driLastname as lastname, driRating as rating, couName as nationality, couLogoLink as countryFlag, teaName as team, driPictureLink as pictureLink, driPoint as point FROM t_drivers d
        JOIN t_country c ON c.idCountry = d.fkCountry
        LEFT JOIN t_teams t ON t.idTeam = d.fkTeam
        ORDER BY d.idDriver ASC;
        
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

exports.getAllDriversInATeam = async (req, res) => {

    let baseQuery = `
        SELECT idDriver as id, driFirstname as firstname, driLastname as lastname, driRating as rating, couName as nationality, couLogoLink as countryFlag, teaName as team, driPictureLink as pictureLink, driPoint as point FROM t_drivers d
        JOIN t_country c ON c.idCountry = d.fkCountry
        LEFT JOIN t_teams t ON t.idTeam = d.fkTeam
        WHERE d.fkTeam IS NOT NULL
        ORDER BY d.idDriver ASC;
        
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

exports.addDriver = async (req, res) => {


    let pictureLink = req.body.pictureLink?.trim() || 'defaultDriverPic.jpg';

    let baseQuery = `
    INSERT INTO t_drivers (driFirstname, driLastname, driRating, driPictureLink, fkCountry, fkTeam)
    VALUES (?, ?, ?, ?, ?, NULL);
`;

    let params = [
        req.body.firstname,
        req.body.lastname,
        req.body.rating,
        pictureLink,
        req.body.nationality
    ];

    db.run(baseQuery, params, function (err) {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json({ message: "Driver ajouté avec succès" });
    });

}

exports.updateDriver = async (req, res) => {


    let params = [
        req.body.firstname,
        req.body.lastname,
        req.body.rating,
        req.body.picture,
        req.body.nationality,
        req.body.idDriver
    ];

    const updateQuery = `
        UPDATE t_drivers
        SET driFirstname = ?, driLastname = ?, driRating = ?, driPictureLink = ?, fkCountry = ?
        WHERE idDriver = ?;
    `;

    db.run(updateQuery, params, function (err) {
        if (err) {
            console.error("Erreur lors de la mise à jour :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        return res.json({ success: true, });

    })

}

exports.updateDriverTeam = async (req, res) => {


    let params = [
        req.body.idTeam,
        req.body.idDriver
    ];

    const updateQuery = `
        UPDATE t_drivers
        SET fkTeam = ?
        WHERE idDriver = ?;
    `;

    db.run(updateQuery, params, function (err) {
        if (err) {
            console.error("Erreur lors de la mise à jour :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        return res.json({ success: true, });

    })

}

exports.updateDriverPoints = async (req, res) => {

   
    let params = [
        req.body.points,
        req.body.idDriver
    ]
    const updateQuery = `
        UPDATE t_drivers
        SET driPoint = ?
        WHERE idDriver = ?;
    `;

    db.run(updateQuery, params, function (err) {
        if (err) {
            console.error("Erreur lors de la mise à jour :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        return res.json({ success: true, });

    })
}