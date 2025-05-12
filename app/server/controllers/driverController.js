const db = require('../db')

exports.getAllDrivers = async (req, res) => {

    let baseQuery = `
        SELECT idDriver as id, driFirstname as firstname, driLastname as lastname, driRating as rating, couName as nationality, couLogoLink as countryFlag, teaName as team, driPictureLink as pictureLink FROM t_drivers d
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