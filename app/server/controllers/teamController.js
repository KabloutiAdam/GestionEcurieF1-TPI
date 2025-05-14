const db = require('../db')

exports.getAllTeams = async (req, res) => {

    let baseQuery = `
        SELECT idTeam as id, teaName as name, teaLogoLink as pictureLink FROM t_teams t
        ORDER BY t.idTeam ASC;
        
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

exports.addTeam = async (req, res) => {


    let pictureLink = req.body.pictureLink?.trim() || 'defaultTeamLogo.jpg';

    let baseQuery = `
    INSERT INTO t_teams (teaName, teaLogoLink)
    VALUES (?, ?);
`;

    let params = [
        req.body.name,
        pictureLink
    ];

    db.run(baseQuery, params, function (err) {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json({ message: "Team ajoutée avec succès" });
    });

}


exports.updateTeam = async (req, res) => {


    let params = [
        req.body.name,
        req.body.idTeam
    ];

    const updateQuery = `
        UPDATE t_teams
        SET teaName = ?
        WHERE idTeam = ?;
    `;

      db.run(updateQuery, params, function (err) {
        if (err) {
            console.error("Erreur lors de la mise à jour :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        return res.json({ success: true, });
        
    })
}