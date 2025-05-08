const db = require('../db')

exports.getAllDrivers = async (req, res) => {
    
    let baseQuery = `
        SELECT idDriver, driFirstname, driLastname, driRating, couName, teaName FROM t_drivers d
        JOIN t_country c ON c.idCountry = d.fkCountry
        JOIN t_teams t ON t.idTeam = d.fkTeam
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