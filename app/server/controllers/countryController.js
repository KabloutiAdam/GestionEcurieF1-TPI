const db = require('../db')

exports.getAllCountries = async (req, res) => {
    const searchQuery = req.query.query?.toLowerCase();
    let baseQuery = `

        SELECT idCountry as id, couName as name, couLogoLink as countryFlag FROM t_country
    `;

    let params = [];

    if (searchQuery) {
        baseQuery += ` WHERE LOWER(t_country.couName) LIKE ? `;
        params.push(`${searchQuery}%`);
    }

    db.all(baseQuery, params, (err, rows) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(rows);
    });
}

